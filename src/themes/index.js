import { darken, lighten } from 'polished';

const variables = {
    primaryColor: '#70259A',
    primaryColorShade1: darken(0.05, '#70259A'),
    primaryColorShade2: darken(0.1, '#70259A'),
    primaryColorShade3: darken(0.2, '#70259A'),
    primaryColorTint1: lighten(0.2, '#70259A'),
    primaryColorTint2: lighten(0.4, '#70259A'),
    primaryColorTint3: lighten(0.6, '#70259A'),
    primaryGrey: '#5a6574',
    primaryGreyDark: '#485465',
    primaryGreyTint1: '#6C7683',
    primaryGreyTint2: '#989898',
    primaryGreyTint3: '#9198a2',
    primaryGreyTint4: '#B5BAC0',
    primaryGreyTint5: '#D1D4D8',
    primaryGreyTint6: '#E3E5E8',
    primaryGreyTint7: '#ECEDEF',
    primaryGreyTint8: '#f9f9fa',
    primaryGreyShade1: '#1D232A',
    primaryGreyShade2: '#242a32',
    primaryGreyShade3: '#323232',
    secondaryGrey: '#F0F4F6',
    secondaryGreyTint1: '#F0F4F6',
    secondaryGreyTint2: '#F4F7F8',
    errorColor: '#FF2525',
    errorColorTint: '#FFD3D3',
    infoColor: '#399DED',
    infoColorTint: '#D7EBFB',
    successColor: '#4ac471',
    warningColor: '#EDA91A',
    warningColorTint: '#FAE5BA',
    white: '#FFF'
};

const theme = {
    errorColor: '#FF2525',
    errorColorTint: '#FFD3D3',
    infoColor: '#399DED',
    infoColorTint: '#D7EBFB',
    successColor: '#4ac471',
    warningColor: '#EDA91A',
    warningColorTint: '#FAE5BA',
    // Components
    actionMenu: {
        background: variables.white,
        border: variables.primaryGreyTint6,
        itemColor: variables.primaryGreyDark,
        itemSubTitleColor: variables.primaryGreyTint3,
        itemBorder: variables.primaryGreyTint6,
        itemBackgroundActive: '#fceae6',
        itemBackgroundHover: '#f8f8f8',
    },
    actionsGroup: {
        dividerColor: '#e0e0e0'
    },
    arrowToggle: {
        color: variables.primaryGreyTint2,
        colorActive: variables.primaryColor,
        colorDisabled: variables.primaryGreyTint4
    },
    avatar: {
        border: variables.secondaryGreyTint2,
        borderActive: variables.primaryColor,
        borderHover: variables.primaryColor
    },
    board: {
        background: variables.white,
        headingColor: variables.primaryColor,
        border: variables.primaryGreyTint6,
        textColor: variables.primaryGreyDark
    },
    breadcrumb: {
        background: variables.primaryGreyTint8,
        color: variables.primaryGreyTint3,
        linkColorHover: variables.primaryColor,
        iconColor: variables.primaryGreyTint3
    },
    button: {
        color: variables.white,
        background: variables.primaryColor,
        backgroundDisabled: variables.primaryColorTint2,
        backgroundHover: variables.primaryColorShade2,
        loaderColor: variables.white
    },
    buttonOutlined: {
        color: variables.primaryGreyDark,
        colorDisabled: variables.primaryGreyTint5,
        border: variables.primaryColor,
        borderDisabled: variables.primaryColorTint1,
        background: variables.white,
        backgroundDisabled: variables.white,
        backgroundHover: variables.primaryColorTint2,
        loaderColor: variables.primaryColor
    },
    checkbox: {
        borderColor: variables.primaryGreyTint5,
        borderColorDisabled: variables.primaryGreyTint7,
        backgroundDisabled: variables.primaryGreyTint7,
        background: variables.white,
        tickColor: variables.white,
        backgroundChecked: variables.successColor,
        backgroundCheckedDisabled: '#92dcaa'
    },
    colorPicker: {
        buttonBorderColor: variables.primaryGreyTint5,
        buttonBorderColorActive: variables.primaryColorTint2,
        inputBackground: variables.white,
        inputBorderColor: variables.primaryGreyTint6,
        inputColor: variables.primaryGreyDark,
        pointerColor: '#666666',
        popupColor: '#333333',
        popupBackground: variables.white
    },
    dropdown: {
        border: '#dadce0',
        borderActive: variables.primaryColorTint2,
        background: variables.primaryGreyTint8,
        color: variables.primaryGreyTint1,
        colorDisabled: variables.primaryGreyTint4
    },
    form: {
        borderColor: variables.primaryGreyTint6,
        sectionHeading: variables.primaryColor
    },
    header: {
        color: variables.primaryGreyDark,
        background: variables.white
    },
    hint: {
        iconColor: variables.primaryGreyTint2,
        color: variables.primaryGreyTint3,
        linkColor: variables.primaryColor,
        linkColorHover: variables.primaryColorShade2
    },
    imagePicker: {
        background: variables.primaryGreyTint8,
        border: variables.primaryGreyTint6,
        borderError: variables.errorColor,
        contentBackground: variables.white,
        iconColor: variables.primaryColor,
        contentTitleColor: variables.primaryGreyDark,
        contentColor: variables.primaryGreyTint3,
        borderHover: variables.primaryColor,
        removeButtonColor: variables.primaryColor
    },
    input: {
        background: variables.primaryGreyTint8,
        backgroundReadOnly: variables.primaryGreyTint7,
        border: variables.primaryGreyTint7,
        borderFocused: variables.primaryColorTint2,
        caretColor: variables.primaryColor,
        characterCountColor: variables.primaryGreyTint2,
        color: variables.primaryGrey,
        colorDisabled: variables.primaryGreyTint3,
        placeholder: variables.primaryGreyTint3,
        placeholderDisabled: variables.primaryGreyTint5
    },
    inputDisplayButton: {
        color: variables.primaryColor,
        colorDisabled: variables.primaryColorTint2
    },
    label: {
        color: variables.primaryGreyDark,
        colorDisabled: variables.primaryGreyTint3,
        noteColor: variables.primaryGreyTint2
    },
    labelAdditional: {
        color: variables.primaryGreyTint3,
        colorDisabled: variables.primaryGreyTint3,
        linkColor: variables.primaryColor
    },
    linearLoader: {
        color: variables.primaryColor
    },
    tabs: {
        borderColor: variables.primaryGreyTint6,
        colorActive: variables.primaryColor,
        colorHover: variables.primaryGreyDark,
        borderActive: variables.primaryColor,
        color: variables.primaryGreyTint3,
        actionBackground: 'transparent',
        actionColor: variables.primaryColor,
        actionDividerColor: variables.primaryGreyTint4,
        actionColorHover: variables.primaryColorShade1,
        actionIconColor: variables.primaryColor
    },
    modal: {
        errorColor: variables.errorColor,
        successColor: variables.successColor,
        defaultColor: variables.primaryColor,
        border: '#e0e0e0',
        background: variables.white,
        closeButtonColor: variables.primaryColor,
        contentColor: variables.primaryGreyDark,
        actionDivider: '#e0e0e0',
        linkColor: variables.primaryColor
    },
    navigation: {
        activeLinkLineColor: variables.primaryColor,
        background: lighten(0.1, '#000'),
        linkColor: variables.primaryGrey,
        linkActiveColor: variables.primaryColorShade1,
        linkBackgroundHover: lighten(0.08, '#000'),
        logoBackground: '#000',
        logoPipeColor: '#252a31',
        loadingCircleColor: '#2B323C'
    },
    notifications: {
        background: variables.white,
        color: '#515c6c',
        iconColor: variables.primaryGreyTint4,
        iconColorHover: variables.primaryGrey,
        errorColor: variables.primaryColor,
        linkColor: variables.primaryColor,
        successColor: variables.successColor,
        warningColor: variables.warningColor
    },
    resetButton: {
        background: variables.errorColor,
        backgroundDisabled: variables.primaryColorTint3
    },
    searchInput: {
        background: variables.primaryGreyTint8,
        backgroundDisabled: '#f8f8f8',
        border: variables.primaryGreyTint6,
        caretColor: variables.primaryColor,
        borderDisabled: variables.primaryGreyTint7,
        borderFocused: variables.primaryColorTint1,
        color: variables.primaryGreyDark,
        colorDisabled: variables.primaryGreyTint2,
        placeholder: variables.primaryGreyTint3,
        placeholderDisabled: variables.primaryGreyTint6,
        icon: variables.primaryColor,
        iconDisabled: variables.primaryColorTint1
    },
    sectionAction: {
        actionColor: variables.primaryColor,
        actionColorHover: variables.primaryGreyDark,
        actionDividerColor: variables.primaryGreyTint4,
        actionIconColor: variables.primaryColor,
        borderColor: variables.primaryGreyTint6
    },
    spinnerLoader: {
        color: variables.secondaryGreyTint1,
        colorAccent: variables.primaryColor
    },
    table: {
        background: variables.white,
        borderColor: variables.primaryGreyTint6,
        cellBorderBottomColor: variables.primaryGreyTint7,
        cellColor: variables.primaryGrey,
        cellColorDisabled: variables.primaryGreyTint3,
        cellLinkColor: variables.primaryColor,

        // Head cell
        headBackground: variables.primaryGreyTint7,
        headCellColor: variables.primaryGreyDark,
        headCellSortArrow: variables.primaryGreyShade2,
        headCellSortArrowActive: variables.primaryColor,
        headCellSortArrowDisabled: variables.primaryGreyTint4,

        // Message
        messageColor: '#bdc1c7',

        rowColor: variables.primaryGreyTint1,
        rowBackgroundHover: variables.primaryGreyTint8
    },
    tableActions: {
        iconColor: variables.primaryColor,
        itemBackgroundHover: variables.primaryGreyTint8,
        itemBorderColor: variables.primaryGreyTint7,
        itemColor: variables.primaryGreyDark,
        itemColorActive: variables.primaryColor,
        itemColorHover: variables.primaryColor,
        itemIconColor: variables.primaryGreyDark,
        menuBackground: variables.white,
        menuBorderColor: variables.primaryGreyTint6,
    },
    tablePagination: {
        buttonBackground: variables.white,
        buttonBackgroundDisabled: variables.primaryGreyTint7,
        buttonBackgroundHover: '#fdeeea',
        buttonBorderColor: variables.primaryGreyTint5,
        buttonBorderColorDisabled: variables.primaryGreyTint6,
        buttonBorderColorHover: variables.primaryColor,
        buttonIconColor: variables.primaryGreyShade2,
        buttonIconColorDisabled: variables.primaryGreyTint5,
        buttonIconColorHover: variables.primaryColor,
        currentPageColor: variables.primaryColor,
        totalPagesColor: variables.primaryGreyDark,
        totalPagesColorDisabled: variables.primaryGreyTint4
    },
    textArea: {
        border: variables.primaryGreyTint7,
        borderFocused: variables.primaryColorTint2,
        background: variables.primaryGreyTint8,
        caretColor: variables.primaryColor,
        color: variables.primaryGrey,
        characterCountColor: variables.primaryGreyTint2,
        placeholder: variables.primaryGreyTint3,
        placeholderDisabled: variables.primaryGreyTint5,
        displayButton: variables.primaryColor,
        displayButtonDisabled: variables.primaryColorTint1
    },
    validationError: {
        color: variables.errorColor
    },
    // Features
    auth: {
        background: '#201728',
        formBackground: variables.white,
        formLinkColor: variables.primaryGreyTint2,
        formLinkColorHover: variables.primaryColor,
        formHeadingColor: variables.primaryColor,
        formInfoColor: '#485465'
    },
    accountSettingsMenu: {
        menuBackground: variables.white,
        menuItemBorderColor: variables.secondaryGrey,
        menuItemColor: variables.primaryGreyTint1,
        menuItemHoverBackground: variables.secondaryGreyTint2,
        menuItemHoverColor: variables.primaryColor,
        userNameColor: variables.primaryGreyTint3,
        organisationColor: variables.primaryGreyTint1
    },
    // Layout
    layout: {
        background: variables.white
    }
};

export default theme;
