import { GridLocaleText } from '@mui/x-data-grid';
import { TFunction } from 'i18next';
export const localizeDataGrid = (t: TFunction): Partial<GridLocaleText> => ({
    // Root
    noRowsLabel: t('dataGrid.noRowsLabel'),
    // noResultsOverlayLabel: 'No results found.',
    errorOverlayDefaultLabel: t('dataGrid.errorOverlayDefaultLabel'),

    // Density selector toolbar button text
    toolbarDensity: t('dataGrid.toolbarDensity'),
    toolbarDensityLabel: t('dataGrid.toolbarDensityLabel'),
    toolbarDensityCompact: t('dataGrid.toolbarDensityCompact'),
    toolbarDensityStandard: t('dataGrid.toolbarDensityStandard'),
    toolbarDensityComfortable: t('dataGrid.toolbarDensityComfortable'),

    // Columns selector toolbar button text
    toolbarColumns: t('dataGrid.toolbarColumns'),
    toolbarColumnsLabel: t('dataGrid.toolbarColumnsLabel'),

    // Filters toolbar button text
    toolbarFilters: t('dataGrid.toolbarFilters'),
    toolbarFiltersLabel: t('dataGrid.toolbarFiltersLabel'),
    toolbarFiltersTooltipHide: t('dataGrid.toolbarFiltersTooltipHide'),
    toolbarFiltersTooltipShow: t('dataGrid.toolbarFiltersTooltipShow'),
    toolbarFiltersTooltipActive: (count) =>
        count > 1 ? `${count} ${t('dataGrid.toolbarFiltersTooltipActive.singular')}` : `${count} ${t('dataGrid.toolbarFiltersTooltipActive.plural')}`,

    // Export selector toolbar button text
    toolbarExport: t('dataGrid.toolbarExport'),
    toolbarExportLabel: t('dataGrid.toolbarExportLabel'),
    toolbarExportCSV: t('dataGrid.toolbarExportCSV'),

    // Columns panel text
    columnsPanelTextFieldLabel: t('dataGrid.columnsPanelTextFieldLabel'),
    columnsPanelTextFieldPlaceholder: t('dataGrid.columnsPanelTextFieldPlaceholder'),
    columnsPanelDragIconLabel: t('dataGrid.columnsPanelDragIconLabel'),
    columnsPanelShowAllButton: t('dataGrid.columnsPanelShowAllButton'),
    columnsPanelHideAllButton: t('dataGrid.columnsPanelHideAllButton'),

    // Filter panel text
    filterPanelAddFilter: t('dataGrid.filterPanelAddFilter'),
    filterPanelDeleteIconLabel: t('dataGrid.filterPanelDeleteIconLabel'),
    filterPanelOperators: t('dataGrid.filterPanelOperators'),
    filterPanelOperatorAnd: t('dataGrid.filterPanelOperatorAnd'),
    filterPanelOperatorOr: t('dataGrid.filterPanelOperatorOr'),
    filterPanelColumns: t('dataGrid.filterPanelColumns'),
    filterPanelInputLabel: t('dataGrid.filterPanelInputLabel'),
    filterPanelInputPlaceholder: t('dataGrid.filterPanelInputPlaceholder'),

    // Filter operators text
    filterOperatorContains: t('dataGrid.filterOperatorContains'),
    filterOperatorEquals: t('dataGrid.filterOperatorEquals'),
    filterOperatorStartsWith: t('dataGrid.filterOperatorStartsWith'),
    filterOperatorEndsWith: t('dataGrid.filterOperatorEndsWith'),
    filterOperatorIs: t('dataGrid.filterOperatorIs'),
    filterOperatorNot: t('dataGrid.filterOperatorNot'),
    filterOperatorAfter: t('dataGrid.filterOperatorAfter'),
    filterOperatorOnOrAfter: t('dataGrid.filterOperatorOnOrAfter'),
    filterOperatorBefore: t('dataGrid.filterOperatorBefore'),
    filterOperatorOnOrBefore: t('dataGrid.filterOperatorOnOrBefore'),
    filterOperatorIsEmpty: t('dataGrid.filterOperatorIsEmpty'),
    filterOperatorIsNotEmpty: t('dataGrid.filterOperatorIsNotEmpty'),

    // Column menu text
    columnMenuLabel: t('dataGrid.columnMenuLabel'),
    columnMenuShowColumns: t('dataGrid.columnMenuShowColumns'),
    columnMenuFilter: t('dataGrid.columnMenuFilter'),
    columnMenuHideColumn: t('dataGrid.columnMenuHideColumn'),
    columnMenuUnsort: t('dataGrid.columnMenuUnsort'),
    columnMenuSortAsc:t('dataGrid.columnMenuSortAsc'),
    columnMenuSortDesc: t('dataGrid.columnMenuSortDesc'),

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count > 1 ? `${count} ${t('dataGrid.columnHeaderFiltersTooltipActive.singular')}` : `${count} ${t('dataGrid.columnHeaderFiltersTooltipActive.plural')}`,
    columnHeaderFiltersLabel:t('dataGrid.columnHeaderFiltersLabel'),
    columnHeaderSortIconLabel: t('dataGrid.columnHeaderSortIconLabel'),

    // Rows selected footer text
    footerRowSelected: (count) =>
        count > 1
            ? `${count.toLocaleString()} ${t('dataGrid.footerRowSelected.singular')}`
            : `${count.toLocaleString()} ${t('dataGrid.footerRowSelected.plural')}`,

    // Total rows footer text
    footerTotalRows: t('dataGrid.footerTotalRows'),

    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} ${t('dataGrid.of')} ${totalCount.toLocaleString()}`,

});
