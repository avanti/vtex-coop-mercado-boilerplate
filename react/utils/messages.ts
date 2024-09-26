import { defineMessages } from '@formatjs/intl'

const generalMessagePrefix = 'coop.store'

const departmentsMessagesPrefix = `${generalMessagePrefix}.departments`
const departmentsMessages = defineMessages({
  departments: {
    id: `${departmentsMessagesPrefix}.departments`,
  },
  departmentImage: {
    id: `${departmentsMessagesPrefix}.department-image`,
  },
})

const dealsMessagesPrefix = `${generalMessagePrefix}.deals`
const dealsMessages = defineMessages({
  dealImage: {
    id: `${dealsMessagesPrefix}.deal-image`,
  },
  deals: {
    id: `${dealsMessagesPrefix}.deals`,
  },
})

const megaMenuMessagesPrefix = `${generalMessagePrefix}.mega-menu`
const megaMenuMessages = defineMessages({
  firstLevelList: {
    id: `${megaMenuMessagesPrefix}.first-level-list`,
  },
  firstLevel: {
    id: `${megaMenuMessagesPrefix}.first-level`,
  },
  menuItem: {
    id: `${megaMenuMessagesPrefix}.menu-item`,
  },
  itemName: {
    id: `${megaMenuMessagesPrefix}.item-name`,
  },
  icon: {
    id: `${megaMenuMessagesPrefix}.icon`,
  },
  text: {
    id: `${megaMenuMessagesPrefix}.text`,
  },
  banner: {
    id: `${megaMenuMessagesPrefix}.banner`,
  },
  itemLink: {
    id: `${megaMenuMessagesPrefix}.item-link`,
  },
  secondLevel: {
    id: `${megaMenuMessagesPrefix}.second-level`,
  },
  thirdLevel: {
    id: `${megaMenuMessagesPrefix}.third-level`,
  },
})

export { departmentsMessages, dealsMessages, megaMenuMessages }
