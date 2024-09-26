/* eslint-disable prettier/prettier */
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useApolloClient } from "react-apollo";
import { useLazyFullSession } from "vtex.session-client";

import queryGetPickupPointById from "../../graphql/queries/getPickupPointById.gql";
import { get, set } from "../../requests/localizationLocalStorage";
import getAddressByCep from "../../requests/getAddressByCep";
import getRegionByCep from "../../requests/getRegionByCep";
import simulateOrderForm from "../../requests/simulateOrderForm";
import updateOrderFormShippingData from "../../requests/updateOrderFormShippingData";
import setRegionIdInSession from "../../requests/setRegionIdInSession";
import updateOrderForm from "../../requests/updateOrderForm";
import clearItemsOrderForm from "../../requests/clearItemsOrderForm";
import getOrderFormById from "../../requests/getOrderFormById";
import getSessionApi from "../../requests/getSession";
import updateLogisticsInfoAccordingLocalStorageData from "../../utils/updateItemsAndLogisticsInfoAccordingLocalStorageData";
import isSalesChannel2, { Session } from "../../utils/isSalesChannel2";
import isAuthenticated from "../../utils/isAuthenticated";
import { getCookie } from "../../utils/cookiesHandler";

type LocalizationContextType = {
  children: JSX.Element | JSX.Element[];
};

type CartItemType = {
  id: string;
  index: number;
  seller: string;
  quantity: number;
};

const initialCreateContext: any = {};

export const LocalizationContextProvider = createContext(initialCreateContext);

// const defaultSku = "40899554"; // Cebola
const defaultSku = "40930150"; // SKU infinito

const LocalizationContext = ({ children }: LocalizationContextType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [zipCodeChange, setZipCodeChange] = useState<boolean>(false);
  const [unavailableToDelivery, setUnavailableToDelivery] = useState<boolean>();
  const [pickupPoints, setPickupPoints] = useState<PickupPointType[]>();
  const [deliverySeller, setDeliverySeller] = useState<DeliverySellerType>();
  const [isDelivery, setIsDelivery] = useState<boolean>();
  const [unavailableAddress, setUnavailableAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<any>();
  const [pickupCep, setPickupCep] = useState<string | undefined>();
  const [localCep, setLocalCep] = useState("");
  const [deliverySpecifications, setDeliverySpecifications] = useState<
    DeliverySpecificationsType | null
  >(null);

  const [getSession, session] = useLazyFullSession();
  const [pickUpPointFriendlyName, setPickUpPointFriendlyName] = useState<
    string
  >();

  const [notAvailableProducts, setNotAvailableProducts] = useState(
    {} as NotAvailableProductType,
  );

  useEffect(() => {
    getSession();
    const localizationLocalStorage = get();

    const currentDeliverySpecifications = {} as DeliverySpecificationsType;

    if (localizationLocalStorage) {
      currentDeliverySpecifications.postalCode =
        localizationLocalStorage.address.postalCode;
      currentDeliverySpecifications.isDelivery =
        localizationLocalStorage.isDelivery;
      currentDeliverySpecifications.pickupPointName =
        localizationLocalStorage.pickupPointName;
      currentDeliverySpecifications.sellerId =
        localizationLocalStorage.sellerId;
    }

    setDeliverySpecifications(
      localizationLocalStorage ? currentDeliverySpecifications : null,
    );
    setAddress(localizationLocalStorage?.address);
    setLoading(false);
  }, []);

  const { orderForm } = useOrderForm();
  const client = useApolloClient();
  const skuId = useRef<string | null>();
  const productContextToGA = useRef<any>();

  const getAddress = async (currentCep: string) => {
    try {
      const addressByCep = await getAddressByCep(currentCep);

      if (
        !addressByCep.city ||
        !addressByCep.state ||
        !addressByCep.geoCoordinates.length
      ) {
        throw new Error("");
      }

      return addressByCep;
    } catch (_) {
      return false;
    }
  };

  const getPickupPoints = async (sellers: any[], currentCep: string) => {
    try {
      const sellersPickupPoint: any[] = [];

      for await (const seller of sellers) {
        try {
          const query = await client.query({
            query: queryGetPickupPointById,
            variables: {
              id: seller.id,
            },
          });

          const pickupPoint = query?.data?.pickupPoint;

          if (!pickupPoint?.isActive || !pickupPoint?.id) throw new Error("");

          sellersPickupPoint.push(query.data.pickupPoint);
        } catch (_e) {
          continue;
        }
      }

      const points: any = [];

      if (!skuId.current) return sellersPickupPoint;

      for await (const seller of sellersPickupPoint) {
        const body = {
          items: [
            {
              id: skuId.current,
              quantity: 1,
              seller: seller.id,
            },
          ],
          postalCode: currentCep,
          country: "BRA",
        };

        const request = await simulateOrderForm(body);
        const pickupPointsFound = request?.logisticsInfo.filter(
          (logisticInfo: any) => {
            return (
              logisticInfo.deliveryChannels.find(
                (deliveryChannel: any) =>
                  deliveryChannel.id === "pickup-in-point",
              ) &&
              logisticInfo.slas.find(
                (sla: any) => sla.deliveryChannel === "pickup-in-point",
              )
            );
          },
        );

        if (pickupPointsFound?.length) points.push(seller);
      }

      return points;
    } catch (err) {
      return false;
    }
  };

  const getDeliveryPoint = async (sellers: any[], currentCep: string) => {
    try {
      let selectedSeller;
      let selectedSellerPickup = [];

      const notSc2Sellers = sellers?.filter(
        (seller: any) => seller?.id && !seller.id.includes("sc2"),
      );

      for await (const seller of notSc2Sellers) {
        const body = {
          items: [
            {
              id: skuId.current || defaultSku,
              quantity: 1,
              seller: seller.id,
            },
          ],
          postalCode: currentCep,
          country: "BRA",
        };

        const request = await simulateOrderForm(body);
        const deliveryPointFound = request?.logisticsInfo.find(
          (logisticInfo: any) => {
            return (
              logisticInfo.deliveryChannels.find(
                (deliveryChannel: any) => deliveryChannel.id === "delivery",
              ) &&
              logisticInfo.slas.find(
                (sla: any) => sla.deliveryChannel === "delivery",
              )
            );
          },
        );

        const pickupPointFound = request?.logisticsInfo.find(
          (logisticInfo: any) => {
            return (
              logisticInfo.deliveryChannels.find(
                (deliveryChannel: any) => deliveryChannel.id === "pickup-in-point",
              ) &&
              logisticInfo.slas.find(
                (sla: any) => sla.deliveryChannel === "pickup-in-point",
              )
            );
          },
        );

        console.log("--getDeliveryPoint", request)

        if (deliveryPointFound) {
          selectedSeller = { ...seller, ...deliveryPointFound };
          break;
        }

        if (pickupPointFound) {
          selectedSellerPickup.push({ ...seller, ...pickupPointFound });
        }
      }

      // Retorna primeiro delivery, se não houver, retorna primeiro pickup
      return selectedSeller || selectedSellerPickup[0];
    } catch (_) {
      return false;
    }
  };

  const updateSessionDataByCep = async (currentCep: string) => {
    try {
      const [addressByCep, regionsRequest] = await Promise.all([
        getAddress(currentCep),
        getRegionByCep(currentCep),
      ]);

      if (!addressByCep) {
        setLoading(false);
        setUnavailableAddress(true);

        return;
      }

      if (!regionsRequest || regionsRequest.length === 0) {
        setLoading(false);
        throw new Error("Erro ao encontrar uma loja para este endereço");
      }

      const [{ sellers }] = regionsRequest;

      if (!sellers || !Array.isArray(sellers) || sellers.length === 0) {
        setLoading(false);
        throw new Error("");
      }

      const [points, delivery] = await Promise.all([
        getPickupPoints(sellers, currentCep),
        getDeliveryPoint(sellers, currentCep),
      ]);

      if (points?.length) setPickupPoints(points);

      if (delivery) setDeliverySeller(delivery);

      if (points?.length || delivery) {
        setAddress(addressByCep);
        setStep(2);
        setLoading(false);
      } else {
        setLoading(false);
        setUnavailableAddress(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.message === "") {
        setUnavailableAddress(true);
      } else {
        console.error(error);
        throw error;
      }
    }
  };

  const updateOrderFormItems = async (
    items: CartItemType[],
    sellerId: string,
  ) => {
    const orderFormItems: CartItemType[] = items;
    const mappedItems = orderFormItems.map((item: any) => {
      return {
        ...item,
        seller: sellerId,
      };
    });

    await clearItemsOrderForm(orderForm.id);

    const body = { orderItems: mappedItems };

    return updateOrderForm(orderForm.id, body);
  };

  const updateOrderFormSelectedAddress = async () => {
    const availableAddresses = orderForm?.shipping?.availableAddresses;
    let addressClient;

    if (availableAddresses) {
      addressClient = availableAddresses.find((availableAddress: any) => {
        return (
          ((isDelivery && availableAddress.addressType !== "search") ||
            (!isDelivery && availableAddress.addressType === "search")) &&
          availableAddress?.postalCode?.replace("-", "") ===
            pickupCep?.replace("-", "")
        );
      });
    }

    const selectedAddress = [
      addressClient || {
        addressType: isDelivery ? "residential" : "search",
        country: "BRA",
        postalCode: pickupCep,
      },
    ];

    const data = {
      selectedAddresses: selectedAddress,
      clearAddressIfPostalCodeNotFound: true,
    };

    return updateOrderFormShippingData(orderForm.id, data);
  };

  const setLocalization = async (sellerId: string) => {
    const sessionData = session?.data?.session as Session;

    set({
      sellerId,
      address,
      selectedDeliveryChannel: isDelivery ? "delivery" : "pickup-in-point",
    });

    let updatedOrderForm = await getOrderFormById(orderForm.id);

    const regionId = btoa(`SW#${sellerId}`);

    await setRegionIdInSession(regionId);

    if (updatedOrderForm.items.length) {
      await updateOrderFormItems(
        updatedOrderForm.items,
        `${sellerId}${isSalesChannel2(sessionData) ? "sc2" : ""}`,
      );
      updatedOrderForm = await updateOrderFormSelectedAddress();
      await updateLogisticsInfoAccordingLocalStorageData(updatedOrderForm);
    } else {
      await updateOrderFormSelectedAddress();
    }

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (params.get("startLocalization") === "true") {
      params.delete("startLocalization");
      window.location.replace(`/?${params.toString()}`);
    } else {
      window.location.reload();
    }
  };

  const mustShowCooperadoPopup = async (): Promise<boolean> => {
    try {
      setLoading(true);

      const sessionData = await getSessionApi();
      const localIsSalesChannel2 = isSalesChannel2(sessionData);
      const localIsAuthenticated = isAuthenticated(sessionData);
      const cookieDontShowCooperadoModal = getCookie(
        "dont-show-cooperado-popup",
      );

      const localIsAuthenticatedAndNotCooperado = localIsAuthenticated &&
        !localIsSalesChannel2;

      const mustShow =
        (!localIsAuthenticated || localIsAuthenticatedAndNotCooperado) &&
        cookieDontShowCooperadoModal === null;

      setLoading(false);

      return mustShow;
    } catch (error) {
      setLoading(false);

      return false;
    }
  };

  const showCooperadoPopup = () => {
    setShowModal(true);
    if (loading) {
      setLoading(false);
    }

    setStep(5);
  };

  if (typeof document === "object") {
    document.addEventListener('open-modal-login-addToCart', showCooperadoPopup)
  }

  const val = useMemo(() => {
    return {
      loading,
      setLoading,
      showModal,
      setShowModal,
      address,
      setAddress,
      step,
      setStep,
      zipCodeChange,
      setZipCodeChange,
      unavailableToDelivery,
      setUnavailableToDelivery,
      pickupPoints,
      setPickupPoints,
      deliverySeller,
      setDeliverySeller,
      setLocalization,
      skuId,
      unavailableAddress,
      setUnavailableAddress,
      isDelivery,
      setIsDelivery,
      updateSessionDataByCep,
      setPickupCep,
      pickupCep,
      setLocalCep,
      localCep,
      productContextToGA,
      deliverySpecifications,
      setPickUpPointFriendlyName,
      pickUpPointFriendlyName,
      setNotAvailableProducts,
      notAvailableProducts,
      mustShowCooperadoPopup,
      showCooperadoPopup,
    };
  }, [
    address,
    deliverySeller,
    deliverySpecifications,
    isDelivery,
    loading,
    localCep,
    notAvailableProducts,
    pickUpPointFriendlyName,
    pickupCep,
    pickupPoints,
    setLocalization,
    showCooperadoPopup,
    showModal,
    step,
    unavailableAddress,
    unavailableToDelivery,
    updateSessionDataByCep,
  ]);

  // console.log("--Context:", {
  //   address: val.address,
  //   deliverySeller: val.deliverySeller,
  //   deliverySpecifications: val.deliverySpecifications,
  //   isDelivery: val.isDelivery,
  //   loading: val.loading,
  //   localCep: val.localCep,
  //   notAvailableProducts: val.notAvailableProducts,
  //   pickUpPointFriendlyName: val.pickUpPointFriendlyName,
  //   pickupCep: val.pickupCep,
  //   pickupPoints: val.pickupPoints,
  //   showModal: val.showModal,
  //   step: val.step,
  //   unavailableAddress: val.unavailableAddress,
  //   unavailableToDelivery: val.unavailableToDelivery,
  // });

  return (
    <LocalizationContextProvider.Provider value={val}>
      {children}
    </LocalizationContextProvider.Provider>
  );
};

export default LocalizationContext;
