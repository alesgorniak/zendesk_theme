import { s as styled, B as getColorV8, a6 as Avatar, j as jsxRuntimeExports, a7 as SvgShapesFill, a8 as Grid, a9 as Col, aa as Row, ab as Skeleton, u as useTranslation, ac as LG, ad as MD, X as Button, ae as IconButton, o as Tooltip, af as SvgXStroke, F as Field, a as MediaInput, L as Label, ag as SvgSearchStroke, ah as Dots, r as reactExports, n as notify, i as debounce, ai as CursorPagination, a0 as initI18next, a1 as loadTranslations, a2 as reactDomExports, a3 as ThemeProviders, a4 as createTheme, aj as ErrorBoundary, ak as XXXL, al as SvgChevronUpFill, am as SvgChevronDownFill, A as Anchor, Z as addFlashNotification } from 'shared';
import { g as getVisibleFields, a as getCustomObjectKey, R as RequestFormField } from 'ticket-fields';

const StyledAvatar = styled(Avatar) `
  background-color: ${(props) => getColorV8("grey", 100, props.theme)};
  width: ${(props) => (props.size === "large" ? 72 : 40)}px !important;
  height: ${(props) => (props.size === "large" ? 72 : 40)}px !important;

  && > svg {
    width: ${(props) => (props.size === "large" ? 28 : 16)}px;
    height: ${(props) => (props.size === "large" ? 28 : 16)}px;
    color: ${(props) => getColorV8("grey", 600, props.theme)};
  }
`;
const ItemThumbnail = ({ size, url }) => {
    return (jsxRuntimeExports.jsx(StyledAvatar, { size: size, isSystem: true, children: url ? jsxRuntimeExports.jsx("img", { src: url, alt: "" }) : jsxRuntimeExports.jsx(SvgShapesFill, { "aria-hidden": "true" }) }));
};

const ItemContainer = styled.a `
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  color: ${(props) => props.theme.colors.foreground};

  &:hover {
    border-color: ${(props) => props.theme.colors.primaryHue};
  }

  &:hover,
  &:visited {
    text-decoration: none;
  }
`;
const ItemTitle$1 = styled.div `
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
`;
const ItemDescription = styled.div `
  font-size: ${(props) => props.theme.fontSizes.sm};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-word;
`;
const TextContainer$1 = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.space.xxs};
  color: ${(props) => props.theme.colors.foreground};
  margin-top: ${(props) => props.theme.space.sm};
`;
const ServiceCatalogListItem = ({ serviceItem, helpCenterPath, }) => {
    return (jsxRuntimeExports.jsxs(ItemContainer, { "data-testid": "service-catalog-list-item-container", href: `${helpCenterPath}/services/${serviceItem.id}`, children: [jsxRuntimeExports.jsx(ItemThumbnail, { size: "medium", url: serviceItem.thumbnail_url }), jsxRuntimeExports.jsxs(TextContainer$1, { children: [jsxRuntimeExports.jsx(ItemTitle$1, { children: serviceItem.name }), jsxRuntimeExports.jsx(ItemDescription, { dangerouslySetInnerHTML: { __html: serviceItem.description } })] })] }));
};

const StyledGrid$1 = styled(Grid) `
  padding: 0;
`;
const StyledCol$1 = styled(Col) `
  @media (min-width: 0px) {
    margin-bottom: ${(props) => props.theme.space.md};
  }
`;
const SkeletonCol = () => (jsxRuntimeExports.jsx(StyledCol$1, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "140px" }) }));
const LoadingState = () => {
    return (jsxRuntimeExports.jsx(StyledGrid$1, { children: jsxRuntimeExports.jsxs(Row, { wrap: "wrap", children: [jsxRuntimeExports.jsx(SkeletonCol, {}), jsxRuntimeExports.jsx(SkeletonCol, {}), jsxRuntimeExports.jsx(SkeletonCol, {}), jsxRuntimeExports.jsx(SkeletonCol, {})] }) }));
};

const Container$2 = styled.div `
  padding: ${(p) => p.theme.space.xl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.space.md};
`;
const TextContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${(props) => props.theme.space.xxs};
`;
const EmptyState = ({ helpCenterPath, searchInputValue, }) => {
    const handleRedirect = () => {
        window.location.href = helpCenterPath;
    };
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsxs(TextContainer, { children: [jsxRuntimeExports.jsx(LG, { children: t("service-catalog.empty-state.no-services", "No services in sight") }), searchInputValue === "" ? (jsxRuntimeExports.jsx(MD, { children: t("service-catalog.empty-state.description", "Once services are added to catalog, you'll find them here.") })) : (jsxRuntimeExports.jsx(MD, { children: t("service-catalog.empty-state.search-description", "Enter your keywords in the search field.") }))] }), searchInputValue === "" && (jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleRedirect, children: t("service-catalog.empty-state.go-to-homepage", "Go to the homepage") }))] }));
};

const StyledIconButton = styled(IconButton) `
  position: absolute;
  top: 4px;
  inset-inline-end: 4px;
`;
const SearchClearIcon = ({ onChange }) => {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsx(Tooltip, { content: t("service-catalog.clear-search", "Clear search"), placement: "bottom", size: "small", children: jsxRuntimeExports.jsx(StyledIconButton, { "aria-label": t("service-catalog.clear-search", "Clear search"), size: "small", focusInset: true, onClick: () => onChange(""), children: jsxRuntimeExports.jsx(SvgXStroke, {}) }) }));
};

const StyledField = styled(Field) `
  align-items: center;
  width: 320px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
`;
const StyledMediaInput = styled(MediaInput) `
  padding-inline-end: ${(props) => props.theme.space.base * 7}px;
`;
const Search = ({ searchInputValue, isLoading, onChange, }) => {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(StyledField, { children: [jsxRuntimeExports.jsx(Label, { hidden: true, children: t("service-catalog.search-services", "Search for services") }), jsxRuntimeExports.jsx(StyledMediaInput, { start: jsxRuntimeExports.jsx(SvgSearchStroke, {}), type: "search", autoComplete: "off", end: isLoading && searchInputValue ? jsxRuntimeExports.jsx(Dots, {}) : undefined, value: searchInputValue, placeholder: t("service-catalog.search-services", "Search for services"), onChange: (event) => onChange(event.target.value) }), !isLoading && searchInputValue && (jsxRuntimeExports.jsx(SearchClearIcon, { onChange: onChange }))] }));
};

const PAGE_SIZE = 16;
function useServiceCatalogItems() {
    const [meta, setMeta] = reactExports.useState(null);
    const [count, setCount] = reactExports.useState(0);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    const [error, setError] = reactExports.useState(null);
    const [serviceCatalogItems, setServiceCatalogItems] = reactExports.useState([]);
    const fetchData = reactExports.useCallback(async (searchInputValue, currentCursor) => {
        setIsLoading(true);
        const searchParams = new URLSearchParams();
        searchParams.set("page[size]", PAGE_SIZE.toString());
        if (currentCursor) {
            const [cursorKey, cursorValue] = currentCursor.split("=");
            cursorKey && cursorValue && searchParams.set(cursorKey, cursorValue);
        }
        if (searchInputValue) {
            searchParams.set("query", searchInputValue);
        }
        try {
            const response = await fetch(`/api/v2/help_center/service_catalog/items/search?${searchParams.toString()}`);
            const data = await response.json();
            if (response.ok) {
                setMeta(data.meta);
                setServiceCatalogItems(data.service_catalog_items);
                setCount(data.count);
                setIsLoading(false);
            }
            if (!response.ok) {
                setIsLoading(false);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }, []);
    return {
        serviceCatalogItems,
        meta,
        count,
        isLoading,
        errorFetchingItems: error,
        fetchServiceCatalogItems: fetchData,
    };
}

const StyledCol = styled(Col) `
  margin-bottom: ${(props) => props.theme.space.md};
`;
const Container$1 = styled.div `
  padding-top: ${(props) => props.theme.space.sm};
  gap: ${(props) => `${props.theme.space.base * 6}px`};
  display: flex;
  flex-direction: column;
`;
const StyledGrid = styled(Grid) `
  padding: 0;
`;
function ServiceCatalogList({ helpCenterPath, }) {
    const [searchInputValue, setSearchInputValue] = reactExports.useState("");
    const { t } = useTranslation();
    const { serviceCatalogItems, meta, count, isLoading, errorFetchingItems, fetchServiceCatalogItems, } = useServiceCatalogItems();
    if (errorFetchingItems) {
        notify({
            title: t("service-catalog.service-list-error-title", "Services couldn't be loaded"),
            message: t("service-catalog.service-list-error-message", "Give it a moment and try it again"),
            type: "error",
        });
        throw errorFetchingItems;
    }
    const debouncedUpdateServiceCatalogItems = reactExports.useMemo(() => debounce(fetchServiceCatalogItems, 300), [fetchServiceCatalogItems]);
    reactExports.useEffect(() => {
        fetchServiceCatalogItems("", null);
    }, [fetchServiceCatalogItems]);
    reactExports.useEffect(() => {
        return () => debouncedUpdateServiceCatalogItems.cancel();
    }, [debouncedUpdateServiceCatalogItems]);
    const handleNextClick = () => {
        if (meta && meta.after_cursor) {
            fetchServiceCatalogItems(searchInputValue, "page[after]=" + meta.after_cursor);
        }
    };
    const handlePreviousClick = () => {
        if (meta && meta.before_cursor) {
            fetchServiceCatalogItems(searchInputValue, "page[before]=" + meta.before_cursor);
        }
    };
    const handleInputChange = (value) => {
        setSearchInputValue(value);
        debouncedUpdateServiceCatalogItems(value, null);
    };
    return (jsxRuntimeExports.jsxs(Container$1, { children: [jsxRuntimeExports.jsx(Search, { searchInputValue: searchInputValue, isLoading: isLoading, onChange: handleInputChange }), jsxRuntimeExports.jsx("span", { children: t("service-catalog.service-count", "{{count}} services", {
                    "defaultValue.one": "{{count}} service",
                    count,
                }) }), isLoading ? (jsxRuntimeExports.jsx(LoadingState, {})) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(StyledGrid, { children: jsxRuntimeExports.jsx(Row, { wrap: "wrap", children: serviceCatalogItems.length !== 0 &&
                                serviceCatalogItems.map((record) => (jsxRuntimeExports.jsx(StyledCol, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(ServiceCatalogListItem, { serviceItem: record, helpCenterPath: helpCenterPath }, record.id) }, record.id))) }) }), serviceCatalogItems.length === 0 && (jsxRuntimeExports.jsx(EmptyState, { helpCenterPath: helpCenterPath, searchInputValue: searchInputValue })), meta && (meta.before_cursor || meta.after_cursor) && (jsxRuntimeExports.jsxs(CursorPagination, { children: [jsxRuntimeExports.jsx(CursorPagination.Previous, { onClick: handlePreviousClick, disabled: meta.before_cursor == null, children: t("service-catalog.pagination.previous", "Previous") }), jsxRuntimeExports.jsx(CursorPagination.Next, { onClick: handleNextClick, disabled: meta.after_cursor == null, children: t("service-catalog.pagination.next", "Next") })] }))] }))] }));
}

function __variableDynamicImportRuntime2__$1(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('shared').then(function (n) { return n.az; });
    case '../shared/translations/locales/ar-x-pseudo.json': return import('shared').then(function (n) { return n.aA; });
    case '../shared/translations/locales/ar.json': return import('shared').then(function (n) { return n.aB; });
    case '../shared/translations/locales/az.json': return import('shared').then(function (n) { return n.aC; });
    case '../shared/translations/locales/be.json': return import('shared').then(function (n) { return n.aD; });
    case '../shared/translations/locales/bg.json': return import('shared').then(function (n) { return n.aE; });
    case '../shared/translations/locales/bn.json': return import('shared').then(function (n) { return n.aF; });
    case '../shared/translations/locales/bs.json': return import('shared').then(function (n) { return n.aG; });
    case '../shared/translations/locales/ca.json': return import('shared').then(function (n) { return n.aH; });
    case '../shared/translations/locales/cs.json': return import('shared').then(function (n) { return n.aI; });
    case '../shared/translations/locales/cy.json': return import('shared').then(function (n) { return n.aJ; });
    case '../shared/translations/locales/da.json': return import('shared').then(function (n) { return n.aK; });
    case '../shared/translations/locales/de-de.json': return import('shared').then(function (n) { return n.aL; });
    case '../shared/translations/locales/de-x-informal.json': return import('shared').then(function (n) { return n.aM; });
    case '../shared/translations/locales/de.json': return import('shared').then(function (n) { return n.aN; });
    case '../shared/translations/locales/el.json': return import('shared').then(function (n) { return n.aO; });
    case '../shared/translations/locales/en-001.json': return import('shared').then(function (n) { return n.aP; });
    case '../shared/translations/locales/en-150.json': return import('shared').then(function (n) { return n.aQ; });
    case '../shared/translations/locales/en-au.json': return import('shared').then(function (n) { return n.aR; });
    case '../shared/translations/locales/en-ca.json': return import('shared').then(function (n) { return n.aS; });
    case '../shared/translations/locales/en-gb.json': return import('shared').then(function (n) { return n.aT; });
    case '../shared/translations/locales/en-my.json': return import('shared').then(function (n) { return n.aU; });
    case '../shared/translations/locales/en-ph.json': return import('shared').then(function (n) { return n.aV; });
    case '../shared/translations/locales/en-se.json': return import('shared').then(function (n) { return n.aW; });
    case '../shared/translations/locales/en-us.json': return import('shared').then(function (n) { return n.aX; });
    case '../shared/translations/locales/en-x-dev.json': return import('shared').then(function (n) { return n.aY; });
    case '../shared/translations/locales/en-x-keys.json': return import('shared').then(function (n) { return n.aZ; });
    case '../shared/translations/locales/en-x-obsolete.json': return import('shared').then(function (n) { return n.a_; });
    case '../shared/translations/locales/en-x-pseudo.json': return import('shared').then(function (n) { return n.a$; });
    case '../shared/translations/locales/en-x-test.json': return import('shared').then(function (n) { return n.b0; });
    case '../shared/translations/locales/es-419.json': return import('shared').then(function (n) { return n.b1; });
    case '../shared/translations/locales/es-ar.json': return import('shared').then(function (n) { return n.b2; });
    case '../shared/translations/locales/es-cl.json': return import('shared').then(function (n) { return n.b3; });
    case '../shared/translations/locales/es-es.json': return import('shared').then(function (n) { return n.b4; });
    case '../shared/translations/locales/es-mx.json': return import('shared').then(function (n) { return n.b5; });
    case '../shared/translations/locales/es-pe.json': return import('shared').then(function (n) { return n.b6; });
    case '../shared/translations/locales/es.json': return import('shared').then(function (n) { return n.b7; });
    case '../shared/translations/locales/et.json': return import('shared').then(function (n) { return n.b8; });
    case '../shared/translations/locales/eu.json': return import('shared').then(function (n) { return n.b9; });
    case '../shared/translations/locales/fa-af.json': return import('shared').then(function (n) { return n.ba; });
    case '../shared/translations/locales/fa.json': return import('shared').then(function (n) { return n.bb; });
    case '../shared/translations/locales/fi.json': return import('shared').then(function (n) { return n.bc; });
    case '../shared/translations/locales/fil.json': return import('shared').then(function (n) { return n.bd; });
    case '../shared/translations/locales/fo.json': return import('shared').then(function (n) { return n.be; });
    case '../shared/translations/locales/fr-ca.json': return import('shared').then(function (n) { return n.bf; });
    case '../shared/translations/locales/fr-dz.json': return import('shared').then(function (n) { return n.bg; });
    case '../shared/translations/locales/fr-mu.json': return import('shared').then(function (n) { return n.bh; });
    case '../shared/translations/locales/fr.json': return import('shared').then(function (n) { return n.bi; });
    case '../shared/translations/locales/ga.json': return import('shared').then(function (n) { return n.bj; });
    case '../shared/translations/locales/he.json': return import('shared').then(function (n) { return n.bk; });
    case '../shared/translations/locales/hi.json': return import('shared').then(function (n) { return n.bl; });
    case '../shared/translations/locales/hr.json': return import('shared').then(function (n) { return n.bm; });
    case '../shared/translations/locales/hu.json': return import('shared').then(function (n) { return n.bn; });
    case '../shared/translations/locales/hy.json': return import('shared').then(function (n) { return n.bo; });
    case '../shared/translations/locales/id.json': return import('shared').then(function (n) { return n.bp; });
    case '../shared/translations/locales/is.json': return import('shared').then(function (n) { return n.bq; });
    case '../shared/translations/locales/it-ch.json': return import('shared').then(function (n) { return n.br; });
    case '../shared/translations/locales/it.json': return import('shared').then(function (n) { return n.bs; });
    case '../shared/translations/locales/ja.json': return import('shared').then(function (n) { return n.bt; });
    case '../shared/translations/locales/ka.json': return import('shared').then(function (n) { return n.bu; });
    case '../shared/translations/locales/kk.json': return import('shared').then(function (n) { return n.bv; });
    case '../shared/translations/locales/kl-dk.json': return import('shared').then(function (n) { return n.bw; });
    case '../shared/translations/locales/km.json': return import('shared').then(function (n) { return n.bx; });
    case '../shared/translations/locales/ko.json': return import('shared').then(function (n) { return n.by; });
    case '../shared/translations/locales/ku.json': return import('shared').then(function (n) { return n.bz; });
    case '../shared/translations/locales/ky.json': return import('shared').then(function (n) { return n.bA; });
    case '../shared/translations/locales/lt.json': return import('shared').then(function (n) { return n.bB; });
    case '../shared/translations/locales/lv.json': return import('shared').then(function (n) { return n.bC; });
    case '../shared/translations/locales/mk.json': return import('shared').then(function (n) { return n.bD; });
    case '../shared/translations/locales/mn.json': return import('shared').then(function (n) { return n.bE; });
    case '../shared/translations/locales/ms.json': return import('shared').then(function (n) { return n.bF; });
    case '../shared/translations/locales/mt.json': return import('shared').then(function (n) { return n.bG; });
    case '../shared/translations/locales/my.json': return import('shared').then(function (n) { return n.bH; });
    case '../shared/translations/locales/ne.json': return import('shared').then(function (n) { return n.bI; });
    case '../shared/translations/locales/nl-be.json': return import('shared').then(function (n) { return n.bJ; });
    case '../shared/translations/locales/nl.json': return import('shared').then(function (n) { return n.bK; });
    case '../shared/translations/locales/no.json': return import('shared').then(function (n) { return n.bL; });
    case '../shared/translations/locales/pl.json': return import('shared').then(function (n) { return n.bM; });
    case '../shared/translations/locales/pt-br.json': return import('shared').then(function (n) { return n.bN; });
    case '../shared/translations/locales/pt.json': return import('shared').then(function (n) { return n.bO; });
    case '../shared/translations/locales/ro-md.json': return import('shared').then(function (n) { return n.bP; });
    case '../shared/translations/locales/ro.json': return import('shared').then(function (n) { return n.bQ; });
    case '../shared/translations/locales/ru.json': return import('shared').then(function (n) { return n.bR; });
    case '../shared/translations/locales/si.json': return import('shared').then(function (n) { return n.bS; });
    case '../shared/translations/locales/sk.json': return import('shared').then(function (n) { return n.bT; });
    case '../shared/translations/locales/sl.json': return import('shared').then(function (n) { return n.bU; });
    case '../shared/translations/locales/sq.json': return import('shared').then(function (n) { return n.bV; });
    case '../shared/translations/locales/sr-me.json': return import('shared').then(function (n) { return n.bW; });
    case '../shared/translations/locales/sr.json': return import('shared').then(function (n) { return n.bX; });
    case '../shared/translations/locales/sv.json': return import('shared').then(function (n) { return n.bY; });
    case '../shared/translations/locales/sw-ke.json': return import('shared').then(function (n) { return n.bZ; });
    case '../shared/translations/locales/ta.json': return import('shared').then(function (n) { return n.b_; });
    case '../shared/translations/locales/th.json': return import('shared').then(function (n) { return n.b$; });
    case '../shared/translations/locales/tr.json': return import('shared').then(function (n) { return n.c0; });
    case '../shared/translations/locales/uk.json': return import('shared').then(function (n) { return n.c1; });
    case '../shared/translations/locales/ur-pk.json': return import('shared').then(function (n) { return n.c2; });
    case '../shared/translations/locales/ur.json': return import('shared').then(function (n) { return n.c3; });
    case '../shared/translations/locales/uz.json': return import('shared').then(function (n) { return n.c4; });
    case '../shared/translations/locales/vi.json': return import('shared').then(function (n) { return n.c5; });
    case '../shared/translations/locales/zh-cn.json': return import('shared').then(function (n) { return n.c6; });
    case '../shared/translations/locales/zh-tw.json': return import('shared').then(function (n) { return n.c7; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime1__$1(path) {
  switch (path) {
    case '../ticket-fields/translations/locales/af.json': return import('ticket-fields').then(function (n) { return n.b; });
    case '../ticket-fields/translations/locales/ar-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.c; });
    case '../ticket-fields/translations/locales/ar.json': return import('ticket-fields').then(function (n) { return n.d; });
    case '../ticket-fields/translations/locales/az.json': return import('ticket-fields').then(function (n) { return n.e; });
    case '../ticket-fields/translations/locales/be.json': return import('ticket-fields').then(function (n) { return n.f; });
    case '../ticket-fields/translations/locales/bg.json': return import('ticket-fields').then(function (n) { return n.h; });
    case '../ticket-fields/translations/locales/bn.json': return import('ticket-fields').then(function (n) { return n.i; });
    case '../ticket-fields/translations/locales/bs.json': return import('ticket-fields').then(function (n) { return n.j; });
    case '../ticket-fields/translations/locales/ca.json': return import('ticket-fields').then(function (n) { return n.k; });
    case '../ticket-fields/translations/locales/cs.json': return import('ticket-fields').then(function (n) { return n.l; });
    case '../ticket-fields/translations/locales/cy.json': return import('ticket-fields').then(function (n) { return n.m; });
    case '../ticket-fields/translations/locales/da.json': return import('ticket-fields').then(function (n) { return n.n; });
    case '../ticket-fields/translations/locales/de-de.json': return import('ticket-fields').then(function (n) { return n.o; });
    case '../ticket-fields/translations/locales/de-x-informal.json': return import('ticket-fields').then(function (n) { return n.p; });
    case '../ticket-fields/translations/locales/de.json': return import('ticket-fields').then(function (n) { return n.q; });
    case '../ticket-fields/translations/locales/el.json': return import('ticket-fields').then(function (n) { return n.r; });
    case '../ticket-fields/translations/locales/en-001.json': return import('ticket-fields').then(function (n) { return n.s; });
    case '../ticket-fields/translations/locales/en-150.json': return import('ticket-fields').then(function (n) { return n.t; });
    case '../ticket-fields/translations/locales/en-au.json': return import('ticket-fields').then(function (n) { return n.u; });
    case '../ticket-fields/translations/locales/en-ca.json': return import('ticket-fields').then(function (n) { return n.v; });
    case '../ticket-fields/translations/locales/en-gb.json': return import('ticket-fields').then(function (n) { return n.w; });
    case '../ticket-fields/translations/locales/en-my.json': return import('ticket-fields').then(function (n) { return n.x; });
    case '../ticket-fields/translations/locales/en-ph.json': return import('ticket-fields').then(function (n) { return n.y; });
    case '../ticket-fields/translations/locales/en-se.json': return import('ticket-fields').then(function (n) { return n.z; });
    case '../ticket-fields/translations/locales/en-us.json': return import('ticket-fields').then(function (n) { return n.A; });
    case '../ticket-fields/translations/locales/en-x-dev.json': return import('ticket-fields').then(function (n) { return n.B; });
    case '../ticket-fields/translations/locales/en-x-keys.json': return import('ticket-fields').then(function (n) { return n.C; });
    case '../ticket-fields/translations/locales/en-x-obsolete.json': return import('ticket-fields').then(function (n) { return n.E; });
    case '../ticket-fields/translations/locales/en-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.F; });
    case '../ticket-fields/translations/locales/en-x-test.json': return import('ticket-fields').then(function (n) { return n.G; });
    case '../ticket-fields/translations/locales/es-419.json': return import('ticket-fields').then(function (n) { return n.H; });
    case '../ticket-fields/translations/locales/es-ar.json': return import('ticket-fields').then(function (n) { return n.J; });
    case '../ticket-fields/translations/locales/es-cl.json': return import('ticket-fields').then(function (n) { return n.K; });
    case '../ticket-fields/translations/locales/es-es.json': return import('ticket-fields').then(function (n) { return n.L; });
    case '../ticket-fields/translations/locales/es-mx.json': return import('ticket-fields').then(function (n) { return n.M; });
    case '../ticket-fields/translations/locales/es-pe.json': return import('ticket-fields').then(function (n) { return n.N; });
    case '../ticket-fields/translations/locales/es.json': return import('ticket-fields').then(function (n) { return n.O; });
    case '../ticket-fields/translations/locales/et.json': return import('ticket-fields').then(function (n) { return n.P; });
    case '../ticket-fields/translations/locales/eu.json': return import('ticket-fields').then(function (n) { return n.Q; });
    case '../ticket-fields/translations/locales/fa-af.json': return import('ticket-fields').then(function (n) { return n.S; });
    case '../ticket-fields/translations/locales/fa.json': return import('ticket-fields').then(function (n) { return n.U; });
    case '../ticket-fields/translations/locales/fi.json': return import('ticket-fields').then(function (n) { return n.V; });
    case '../ticket-fields/translations/locales/fil.json': return import('ticket-fields').then(function (n) { return n.W; });
    case '../ticket-fields/translations/locales/fo.json': return import('ticket-fields').then(function (n) { return n.X; });
    case '../ticket-fields/translations/locales/fr-ca.json': return import('ticket-fields').then(function (n) { return n.Y; });
    case '../ticket-fields/translations/locales/fr-dz.json': return import('ticket-fields').then(function (n) { return n.Z; });
    case '../ticket-fields/translations/locales/fr-mu.json': return import('ticket-fields').then(function (n) { return n._; });
    case '../ticket-fields/translations/locales/fr.json': return import('ticket-fields').then(function (n) { return n.$; });
    case '../ticket-fields/translations/locales/ga.json': return import('ticket-fields').then(function (n) { return n.a0; });
    case '../ticket-fields/translations/locales/he.json': return import('ticket-fields').then(function (n) { return n.a1; });
    case '../ticket-fields/translations/locales/hi.json': return import('ticket-fields').then(function (n) { return n.a2; });
    case '../ticket-fields/translations/locales/hr.json': return import('ticket-fields').then(function (n) { return n.a3; });
    case '../ticket-fields/translations/locales/hu.json': return import('ticket-fields').then(function (n) { return n.a4; });
    case '../ticket-fields/translations/locales/hy.json': return import('ticket-fields').then(function (n) { return n.a5; });
    case '../ticket-fields/translations/locales/id.json': return import('ticket-fields').then(function (n) { return n.a6; });
    case '../ticket-fields/translations/locales/is.json': return import('ticket-fields').then(function (n) { return n.a7; });
    case '../ticket-fields/translations/locales/it-ch.json': return import('ticket-fields').then(function (n) { return n.a8; });
    case '../ticket-fields/translations/locales/it.json': return import('ticket-fields').then(function (n) { return n.a9; });
    case '../ticket-fields/translations/locales/ja.json': return import('ticket-fields').then(function (n) { return n.aa; });
    case '../ticket-fields/translations/locales/ka.json': return import('ticket-fields').then(function (n) { return n.ab; });
    case '../ticket-fields/translations/locales/kk.json': return import('ticket-fields').then(function (n) { return n.ac; });
    case '../ticket-fields/translations/locales/kl-dk.json': return import('ticket-fields').then(function (n) { return n.ad; });
    case '../ticket-fields/translations/locales/km.json': return import('ticket-fields').then(function (n) { return n.ae; });
    case '../ticket-fields/translations/locales/ko.json': return import('ticket-fields').then(function (n) { return n.af; });
    case '../ticket-fields/translations/locales/ku.json': return import('ticket-fields').then(function (n) { return n.ag; });
    case '../ticket-fields/translations/locales/ky.json': return import('ticket-fields').then(function (n) { return n.ah; });
    case '../ticket-fields/translations/locales/lt.json': return import('ticket-fields').then(function (n) { return n.ai; });
    case '../ticket-fields/translations/locales/lv.json': return import('ticket-fields').then(function (n) { return n.aj; });
    case '../ticket-fields/translations/locales/mk.json': return import('ticket-fields').then(function (n) { return n.ak; });
    case '../ticket-fields/translations/locales/mn.json': return import('ticket-fields').then(function (n) { return n.al; });
    case '../ticket-fields/translations/locales/ms.json': return import('ticket-fields').then(function (n) { return n.am; });
    case '../ticket-fields/translations/locales/mt.json': return import('ticket-fields').then(function (n) { return n.an; });
    case '../ticket-fields/translations/locales/my.json': return import('ticket-fields').then(function (n) { return n.ao; });
    case '../ticket-fields/translations/locales/ne.json': return import('ticket-fields').then(function (n) { return n.ap; });
    case '../ticket-fields/translations/locales/nl-be.json': return import('ticket-fields').then(function (n) { return n.aq; });
    case '../ticket-fields/translations/locales/nl.json': return import('ticket-fields').then(function (n) { return n.ar; });
    case '../ticket-fields/translations/locales/no.json': return import('ticket-fields').then(function (n) { return n.as; });
    case '../ticket-fields/translations/locales/pl.json': return import('ticket-fields').then(function (n) { return n.at; });
    case '../ticket-fields/translations/locales/pt-br.json': return import('ticket-fields').then(function (n) { return n.au; });
    case '../ticket-fields/translations/locales/pt.json': return import('ticket-fields').then(function (n) { return n.av; });
    case '../ticket-fields/translations/locales/ro-md.json': return import('ticket-fields').then(function (n) { return n.aw; });
    case '../ticket-fields/translations/locales/ro.json': return import('ticket-fields').then(function (n) { return n.ax; });
    case '../ticket-fields/translations/locales/ru.json': return import('ticket-fields').then(function (n) { return n.ay; });
    case '../ticket-fields/translations/locales/si.json': return import('ticket-fields').then(function (n) { return n.az; });
    case '../ticket-fields/translations/locales/sk.json': return import('ticket-fields').then(function (n) { return n.aA; });
    case '../ticket-fields/translations/locales/sl.json': return import('ticket-fields').then(function (n) { return n.aB; });
    case '../ticket-fields/translations/locales/sq.json': return import('ticket-fields').then(function (n) { return n.aC; });
    case '../ticket-fields/translations/locales/sr-me.json': return import('ticket-fields').then(function (n) { return n.aD; });
    case '../ticket-fields/translations/locales/sr.json': return import('ticket-fields').then(function (n) { return n.aE; });
    case '../ticket-fields/translations/locales/sv.json': return import('ticket-fields').then(function (n) { return n.aF; });
    case '../ticket-fields/translations/locales/sw-ke.json': return import('ticket-fields').then(function (n) { return n.aG; });
    case '../ticket-fields/translations/locales/ta.json': return import('ticket-fields').then(function (n) { return n.aH; });
    case '../ticket-fields/translations/locales/th.json': return import('ticket-fields').then(function (n) { return n.aI; });
    case '../ticket-fields/translations/locales/tr.json': return import('ticket-fields').then(function (n) { return n.aJ; });
    case '../ticket-fields/translations/locales/uk.json': return import('ticket-fields').then(function (n) { return n.aK; });
    case '../ticket-fields/translations/locales/ur-pk.json': return import('ticket-fields').then(function (n) { return n.aL; });
    case '../ticket-fields/translations/locales/ur.json': return import('ticket-fields').then(function (n) { return n.aM; });
    case '../ticket-fields/translations/locales/uz.json': return import('ticket-fields').then(function (n) { return n.aN; });
    case '../ticket-fields/translations/locales/vi.json': return import('ticket-fields').then(function (n) { return n.aO; });
    case '../ticket-fields/translations/locales/zh-cn.json': return import('ticket-fields').then(function (n) { return n.aP; });
    case '../ticket-fields/translations/locales/zh-tw.json': return import('ticket-fields').then(function (n) { return n.aQ; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__$1(path) {
  switch (path) {
    case './translations/locales/af.json': return import('service-catalog-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('service-catalog-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('service-catalog-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('service-catalog-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('service-catalog-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('service-catalog-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('service-catalog-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('service-catalog-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('service-catalog-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('service-catalog-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('service-catalog-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('service-catalog-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('service-catalog-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('service-catalog-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('service-catalog-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('service-catalog-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('service-catalog-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('service-catalog-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('service-catalog-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('service-catalog-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('service-catalog-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('service-catalog-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('service-catalog-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('service-catalog-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('service-catalog-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('service-catalog-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('service-catalog-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('service-catalog-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('service-catalog-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('service-catalog-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('service-catalog-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('service-catalog-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('service-catalog-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('service-catalog-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('service-catalog-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('service-catalog-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('service-catalog-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('service-catalog-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('service-catalog-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('service-catalog-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('service-catalog-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('service-catalog-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('service-catalog-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('service-catalog-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('service-catalog-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('service-catalog-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('service-catalog-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('service-catalog-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('service-catalog-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('service-catalog-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('service-catalog-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('service-catalog-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('service-catalog-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('service-catalog-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('service-catalog-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('service-catalog-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('service-catalog-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('service-catalog-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('service-catalog-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('service-catalog-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('service-catalog-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('service-catalog-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('service-catalog-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('service-catalog-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('service-catalog-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('service-catalog-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('service-catalog-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('service-catalog-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('service-catalog-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('service-catalog-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('service-catalog-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('service-catalog-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('service-catalog-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('service-catalog-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('service-catalog-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('service-catalog-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('service-catalog-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('service-catalog-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('service-catalog-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('service-catalog-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('service-catalog-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('service-catalog-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('service-catalog-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('service-catalog-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('service-catalog-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('service-catalog-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('service-catalog-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('service-catalog-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('service-catalog-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('service-catalog-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('service-catalog-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('service-catalog-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('service-catalog-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('service-catalog-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('service-catalog-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('service-catalog-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('service-catalog-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('service-catalog-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('service-catalog-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderServiceCatalogList(container, settings, helpCenterPath, baseLocale) {
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__$1(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__$1(`../ticket-fields/translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime2__$1(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ServiceCatalogList, { helpCenterPath: helpCenterPath }) }) }), container);
}

const getFieldValue = (field) => {
    if (field.type === "tagger") {
        return (field.custom_field_options.find((option) => option.default)?.value ?? null);
    }
    return null;
};
const formatField = (field) => {
    const { id, type, description, title_in_portal, custom_field_options, required_in_portal, relationship_target_type, relationship_filter, } = field;
    return {
        id,
        type,
        name: `custom_fields_${id}`,
        description,
        label: title_in_portal,
        options: custom_field_options,
        required: required_in_portal,
        relationship_target_type,
        relationship_filter,
        error: null,
        value: getFieldValue(field),
    };
};
const isAssociatedLookupField = (field) => {
    const customObjectKey = getCustomObjectKey(field.relationship_target_type);
    if (customObjectKey === "standard::service_catalog_item") {
        return true;
    }
    return false;
};
const fetchTicketFields = async (form_id, baseLocale) => {
    const [formResponse, fieldsResponse] = await Promise.all([
        fetch(`/api/v2/ticket_forms/${form_id}`),
        fetch(`/api/v2/ticket_fields?locale=${baseLocale}`),
    ]);
    if (!formResponse.ok) {
        throw new Error("Error fetching form data");
    }
    if (!fieldsResponse.ok) {
        throw new Error("Error fetching fields data");
    }
    const formData = await formResponse.json();
    const fieldsData = await fieldsResponse.json();
    if (!formData.ticket_form.active) {
        throw new Error("Associated ticket form is not active");
    }
    const ticketForm = formData.ticket_form;
    const ids = ticketForm.ticket_field_ids;
    const endUserConditions = ticketForm.end_user_conditions || [];
    const ticketFieldsData = fieldsData.ticket_fields;
    let associatedLookupField = null;
    const requestFields = ids
        .map((id) => {
        const ticketField = ticketFieldsData.find((field) => field.id === id);
        if (ticketField &&
            ticketField.type !== "subject" &&
            ticketField.type !== "description" &&
            ticketField.active &&
            ticketField.editable_in_portal) {
            if (ticketField.type === "lookup" &&
                isAssociatedLookupField(ticketField)) {
                associatedLookupField = ticketField;
                return null;
            }
            return formatField(ticketField);
        }
        return null;
    })
        .filter(Boolean);
    if (!associatedLookupField) {
        throw new Error("Associated lookup field not found");
    }
    return { requestFields, associatedLookupField, endUserConditions };
};
function useItemFormFields(serviceCatalogItem, baseLocale) {
    const [allRequestFields, setAllRequestFields] = reactExports.useState([]);
    const [endUserConditions, setEndUserConditions] = reactExports.useState([]);
    const [associatedLookupField, setAssociatedLookupField] = reactExports.useState();
    const [error, setError] = reactExports.useState(null);
    reactExports.useEffect(() => {
        const fetchAndSetFields = async () => {
            if (serviceCatalogItem && serviceCatalogItem.form_id) {
                try {
                    const { requestFields, associatedLookupField, endUserConditions } = await fetchTicketFields(serviceCatalogItem.form_id, baseLocale);
                    setAssociatedLookupField(associatedLookupField);
                    setEndUserConditions(endUserConditions);
                    setAllRequestFields(requestFields);
                }
                catch (error) {
                    setError(error);
                }
            }
        };
        fetchAndSetFields();
    }, [baseLocale, serviceCatalogItem]);
    const handleChange = reactExports.useCallback((field, value) => {
        const updatedFields = allRequestFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField);
        setAllRequestFields(updatedFields);
    }, [allRequestFields]);
    const requestFields = getVisibleFields(allRequestFields, endUserConditions);
    return {
        requestFields,
        associatedLookupField,
        error,
        setRequestFields: setAllRequestFields,
        handleChange,
    };
}

const DescriptionWrapper = styled.div `
  border-bottom: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  padding-bottom: ${(props) => props.theme.space.lg};
  margin-inline-end: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;
const ItemTitle = styled(XXXL) `
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin-bottom: 0;
  overflow-wrap: break-word;
  max-width: 100%;
`;
const CollapsibleText = styled.div `
  font-size: ${(props) => props.theme.fontSizes.md};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.isCollapsed ? 3 : "none")};
  overflow: hidden;
  margin-top: ${(props) => props.theme.space.md};
  padding-inline-end: ${(props) => props.theme.space.xl};
  overflow-wrap: break-word;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-inline-end: 0;
  }
`;
const ToggleButton = styled(Button) `
  margin-top: ${(props) => props.theme.space.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`;
const HeaderContainer = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.space.md};
`;
const CollapsibleDescription = ({ title, description, thumbnailUrl, }) => {
    const [isCollapsed, setIsCollapsed] = reactExports.useState(true);
    const [isClamped, setIsClamped] = reactExports.useState(false);
    const { t } = useTranslation();
    const contentRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        const el = contentRef.current;
        if (el) {
            const checkClamped = () => {
                const visibleBoxHeight = el.getBoundingClientRect().height;
                const fullContentHeight = el.scrollHeight;
                const clamped = fullContentHeight - visibleBoxHeight > 1;
                setIsClamped(clamped);
                if (!clamped) {
                    setIsCollapsed(false);
                }
            };
            requestAnimationFrame(checkClamped);
        }
    }, [description]);
    const toggleDescription = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (jsxRuntimeExports.jsxs(DescriptionWrapper, { children: [jsxRuntimeExports.jsxs(HeaderContainer, { children: [jsxRuntimeExports.jsx(ItemThumbnail, { size: "large", url: thumbnailUrl }), jsxRuntimeExports.jsx(ItemTitle, { tag: "h1", children: title })] }), description && (jsxRuntimeExports.jsx(CollapsibleText, { ref: contentRef, className: "service-catalog-description", isCollapsed: isCollapsed, dangerouslySetInnerHTML: { __html: description } })), isClamped && (jsxRuntimeExports.jsxs(ToggleButton, { isLink: true, onClick: toggleDescription, children: [!isCollapsed
                        ? t("service-catalog.item.read-less", "Read less")
                        : t("service-catalog.item.read-more", "Read more"), jsxRuntimeExports.jsx(Button.EndIcon, { children: !isCollapsed ? jsxRuntimeExports.jsx(SvgChevronUpFill, {}) : jsxRuntimeExports.jsx(SvgChevronDownFill, {}) })] }))] }));
};

const Form = styled.form `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;
const FieldsContainer = styled.div `
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
  margin-inline-end: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;
const ButtonWrapper = styled.div `
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.xl};
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  height: fit-content;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${(props) => getColorV8("grey", 300, props.theme)};
    width: 100vw;
    margin-inline-start: 0;
  }
`;
const RightColumn = styled.div `
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-inline-start: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const LeftColumn = styled.div `
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-inline-end: ${(props) => props.theme.space.xl};
  min-width: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;
function ItemRequestForm({ requestFields, serviceCatalogItem, baseLocale, hasAtMentions, userRole, userId, brandId, defaultOrganizationId, handleChange, onSubmit, }) {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(Form, { onSubmit: onSubmit, noValidate: true, children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(CollapsibleDescription, { title: serviceCatalogItem.name, description: serviceCatalogItem.description, thumbnailUrl: serviceCatalogItem.thumbnail_url }), jsxRuntimeExports.jsx(FieldsContainer, { children: requestFields.map((field) => (jsxRuntimeExports.jsx(RequestFormField, { field: field, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, brandId: brandId, defaultOrganizationId: defaultOrganizationId, handleChange: handleChange, visibleFields: requestFields }, field.id))) })] }), jsxRuntimeExports.jsx(RightColumn, { children: jsxRuntimeExports.jsx(ButtonWrapper, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, size: "large", isStretched: true, type: "submit", children: t("service-catalog.item.submit-button", "Submit request") }) }) })] }));
}

function useServiceCatalogItem(serviceItemId) {
    const [serviceCatalogItem, setServiceCatalogItem] = reactExports.useState();
    const [errorFetchingItem, setError] = reactExports.useState(null);
    reactExports.useEffect(() => {
        const fetchServiceCatalogItem = async () => {
            try {
                const response = await fetch(`/api/v2/help_center/service_catalog/items/${serviceItemId}`);
                if (response.ok) {
                    const data = await response.json();
                    setServiceCatalogItem(data.service_catalog_item);
                }
                else {
                    throw new Error("Error fetching service catalog item");
                }
            }
            catch (error) {
                setError(error);
            }
        };
        fetchServiceCatalogItem();
    }, [serviceItemId]);
    return { serviceCatalogItem, errorFetchingItem };
}

async function submitServiceItemRequest(serviceCatalogItem, requestFields, associatedLookupField, baseLocale) {
    try {
        const currentUserRequest = await fetch("/api/v2/users/me.json");
        if (!currentUserRequest.ok) {
            throw new Error("Error fetching current user data");
        }
        const currentUser = await currentUserRequest.json();
        const customFields = requestFields.map((field) => {
            return {
                id: field.id,
                value: field.value,
            };
        });
        const response = await fetch(`/api/v2/requests?locale=${baseLocale}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": currentUser.user.authenticity_token,
            },
            body: JSON.stringify({
                request: {
                    subject: `${serviceCatalogItem.name}`,
                    comment: {
                        html_body: `<a href="/hc/en-us/services/${serviceCatalogItem.id}" style="text-decoration: underline" target="_blank" rel="noopener noreferrer">${serviceCatalogItem.name}</a>`,
                    },
                    ticket_form_id: serviceCatalogItem.form_id,
                    custom_fields: [
                        ...customFields,
                        { id: associatedLookupField.id, value: serviceCatalogItem.id },
                    ],
                    via: {
                        channel: "web form",
                        source: 50,
                    },
                },
            }),
        });
        return response;
    }
    catch (error) {
        console.error("Error submitting service request:", error);
        return;
    }
}

const Container = styled.div `
  display: flex;
  flex-direction: column;
`;
const StyledNotificationLink = styled(Anchor) `
  text-decoration: underline;
  display: block;
  margin-top: ${(props) => props.theme.space.xxs}px;
`;
function ServiceCatalogItem({ serviceCatalogItemId, baseLocale, hasAtMentions, userRole, organizations, userId, brandId, helpCenterPath, }) {
    const { serviceCatalogItem, errorFetchingItem } = useServiceCatalogItem(serviceCatalogItemId);
    const { requestFields, associatedLookupField, error, setRequestFields, handleChange, } = useItemFormFields(serviceCatalogItem, baseLocale);
    const { t } = useTranslation();
    if (error) {
        throw error;
    }
    if (errorFetchingItem) {
        throw errorFetchingItem;
    }
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        if (!serviceCatalogItem || !associatedLookupField) {
            return;
        }
        const response = await submitServiceItemRequest(serviceCatalogItem, requestFields, associatedLookupField, baseLocale);
        if (!response?.ok) {
            if (response?.status === 422) {
                const errorData = await response.json();
                const invalidFieldErrors = errorData.details.base;
                const missingErrorFields = invalidFieldErrors.filter((errorField) => !requestFields.some((field) => field.id === errorField.field_key));
                if (missingErrorFields.length > 0) {
                    notify({
                        type: "error",
                        title: t("service-catalog.item.service-request-error-title", "Service couldn't be submitted"),
                        message: (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [t("service-catalog.item.service-request-refresh-message", "Refresh the page and try again in a few seconds."), " ", jsxRuntimeExports.jsx(StyledNotificationLink, { href: `${helpCenterPath}/services/${serviceCatalogItem.id}`, children: t("service-catalog.item.service-request-refresh-link-text", "Refresh the page") })] })),
                    });
                }
                const updatedFields = requestFields.map((field) => {
                    const errorField = invalidFieldErrors.find((errorField) => errorField.field_key === field.id);
                    return { ...field, error: errorField?.description || null };
                });
                setRequestFields(updatedFields);
            }
            else {
                notify({
                    title: t("service-catalog.item.service-request-error-title", "Service couldn't be submitted"),
                    message: t("service-catalog.item.service-request-error-message", "Give it a moment and try it again"),
                    type: "error",
                });
            }
        }
        else if (response && response.ok) {
            addFlashNotification({
                type: "success",
                message: t("service-catalog.item.service-request-submitted", "Service request submitted"),
            });
            const data = await response?.json();
            const redirectUrl = `${helpCenterPath}/requests/${data.request.id}`;
            window.location.href = redirectUrl;
        }
    };
    const defaultOrganizationId = organizations.length > 0 && organizations[0]?.id
        ? organizations[0]?.id?.toString()
        : null;
    return (jsxRuntimeExports.jsx(Container, { children: serviceCatalogItem && (jsxRuntimeExports.jsx(ItemRequestForm, { requestFields: requestFields, serviceCatalogItem: serviceCatalogItem, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, brandId: brandId, defaultOrganizationId: defaultOrganizationId, handleChange: handleChange, onSubmit: handleRequestSubmit })) }));
}

function __variableDynamicImportRuntime2__(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('shared').then(function (n) { return n.az; });
    case '../shared/translations/locales/ar-x-pseudo.json': return import('shared').then(function (n) { return n.aA; });
    case '../shared/translations/locales/ar.json': return import('shared').then(function (n) { return n.aB; });
    case '../shared/translations/locales/az.json': return import('shared').then(function (n) { return n.aC; });
    case '../shared/translations/locales/be.json': return import('shared').then(function (n) { return n.aD; });
    case '../shared/translations/locales/bg.json': return import('shared').then(function (n) { return n.aE; });
    case '../shared/translations/locales/bn.json': return import('shared').then(function (n) { return n.aF; });
    case '../shared/translations/locales/bs.json': return import('shared').then(function (n) { return n.aG; });
    case '../shared/translations/locales/ca.json': return import('shared').then(function (n) { return n.aH; });
    case '../shared/translations/locales/cs.json': return import('shared').then(function (n) { return n.aI; });
    case '../shared/translations/locales/cy.json': return import('shared').then(function (n) { return n.aJ; });
    case '../shared/translations/locales/da.json': return import('shared').then(function (n) { return n.aK; });
    case '../shared/translations/locales/de-de.json': return import('shared').then(function (n) { return n.aL; });
    case '../shared/translations/locales/de-x-informal.json': return import('shared').then(function (n) { return n.aM; });
    case '../shared/translations/locales/de.json': return import('shared').then(function (n) { return n.aN; });
    case '../shared/translations/locales/el.json': return import('shared').then(function (n) { return n.aO; });
    case '../shared/translations/locales/en-001.json': return import('shared').then(function (n) { return n.aP; });
    case '../shared/translations/locales/en-150.json': return import('shared').then(function (n) { return n.aQ; });
    case '../shared/translations/locales/en-au.json': return import('shared').then(function (n) { return n.aR; });
    case '../shared/translations/locales/en-ca.json': return import('shared').then(function (n) { return n.aS; });
    case '../shared/translations/locales/en-gb.json': return import('shared').then(function (n) { return n.aT; });
    case '../shared/translations/locales/en-my.json': return import('shared').then(function (n) { return n.aU; });
    case '../shared/translations/locales/en-ph.json': return import('shared').then(function (n) { return n.aV; });
    case '../shared/translations/locales/en-se.json': return import('shared').then(function (n) { return n.aW; });
    case '../shared/translations/locales/en-us.json': return import('shared').then(function (n) { return n.aX; });
    case '../shared/translations/locales/en-x-dev.json': return import('shared').then(function (n) { return n.aY; });
    case '../shared/translations/locales/en-x-keys.json': return import('shared').then(function (n) { return n.aZ; });
    case '../shared/translations/locales/en-x-obsolete.json': return import('shared').then(function (n) { return n.a_; });
    case '../shared/translations/locales/en-x-pseudo.json': return import('shared').then(function (n) { return n.a$; });
    case '../shared/translations/locales/en-x-test.json': return import('shared').then(function (n) { return n.b0; });
    case '../shared/translations/locales/es-419.json': return import('shared').then(function (n) { return n.b1; });
    case '../shared/translations/locales/es-ar.json': return import('shared').then(function (n) { return n.b2; });
    case '../shared/translations/locales/es-cl.json': return import('shared').then(function (n) { return n.b3; });
    case '../shared/translations/locales/es-es.json': return import('shared').then(function (n) { return n.b4; });
    case '../shared/translations/locales/es-mx.json': return import('shared').then(function (n) { return n.b5; });
    case '../shared/translations/locales/es-pe.json': return import('shared').then(function (n) { return n.b6; });
    case '../shared/translations/locales/es.json': return import('shared').then(function (n) { return n.b7; });
    case '../shared/translations/locales/et.json': return import('shared').then(function (n) { return n.b8; });
    case '../shared/translations/locales/eu.json': return import('shared').then(function (n) { return n.b9; });
    case '../shared/translations/locales/fa-af.json': return import('shared').then(function (n) { return n.ba; });
    case '../shared/translations/locales/fa.json': return import('shared').then(function (n) { return n.bb; });
    case '../shared/translations/locales/fi.json': return import('shared').then(function (n) { return n.bc; });
    case '../shared/translations/locales/fil.json': return import('shared').then(function (n) { return n.bd; });
    case '../shared/translations/locales/fo.json': return import('shared').then(function (n) { return n.be; });
    case '../shared/translations/locales/fr-ca.json': return import('shared').then(function (n) { return n.bf; });
    case '../shared/translations/locales/fr-dz.json': return import('shared').then(function (n) { return n.bg; });
    case '../shared/translations/locales/fr-mu.json': return import('shared').then(function (n) { return n.bh; });
    case '../shared/translations/locales/fr.json': return import('shared').then(function (n) { return n.bi; });
    case '../shared/translations/locales/ga.json': return import('shared').then(function (n) { return n.bj; });
    case '../shared/translations/locales/he.json': return import('shared').then(function (n) { return n.bk; });
    case '../shared/translations/locales/hi.json': return import('shared').then(function (n) { return n.bl; });
    case '../shared/translations/locales/hr.json': return import('shared').then(function (n) { return n.bm; });
    case '../shared/translations/locales/hu.json': return import('shared').then(function (n) { return n.bn; });
    case '../shared/translations/locales/hy.json': return import('shared').then(function (n) { return n.bo; });
    case '../shared/translations/locales/id.json': return import('shared').then(function (n) { return n.bp; });
    case '../shared/translations/locales/is.json': return import('shared').then(function (n) { return n.bq; });
    case '../shared/translations/locales/it-ch.json': return import('shared').then(function (n) { return n.br; });
    case '../shared/translations/locales/it.json': return import('shared').then(function (n) { return n.bs; });
    case '../shared/translations/locales/ja.json': return import('shared').then(function (n) { return n.bt; });
    case '../shared/translations/locales/ka.json': return import('shared').then(function (n) { return n.bu; });
    case '../shared/translations/locales/kk.json': return import('shared').then(function (n) { return n.bv; });
    case '../shared/translations/locales/kl-dk.json': return import('shared').then(function (n) { return n.bw; });
    case '../shared/translations/locales/km.json': return import('shared').then(function (n) { return n.bx; });
    case '../shared/translations/locales/ko.json': return import('shared').then(function (n) { return n.by; });
    case '../shared/translations/locales/ku.json': return import('shared').then(function (n) { return n.bz; });
    case '../shared/translations/locales/ky.json': return import('shared').then(function (n) { return n.bA; });
    case '../shared/translations/locales/lt.json': return import('shared').then(function (n) { return n.bB; });
    case '../shared/translations/locales/lv.json': return import('shared').then(function (n) { return n.bC; });
    case '../shared/translations/locales/mk.json': return import('shared').then(function (n) { return n.bD; });
    case '../shared/translations/locales/mn.json': return import('shared').then(function (n) { return n.bE; });
    case '../shared/translations/locales/ms.json': return import('shared').then(function (n) { return n.bF; });
    case '../shared/translations/locales/mt.json': return import('shared').then(function (n) { return n.bG; });
    case '../shared/translations/locales/my.json': return import('shared').then(function (n) { return n.bH; });
    case '../shared/translations/locales/ne.json': return import('shared').then(function (n) { return n.bI; });
    case '../shared/translations/locales/nl-be.json': return import('shared').then(function (n) { return n.bJ; });
    case '../shared/translations/locales/nl.json': return import('shared').then(function (n) { return n.bK; });
    case '../shared/translations/locales/no.json': return import('shared').then(function (n) { return n.bL; });
    case '../shared/translations/locales/pl.json': return import('shared').then(function (n) { return n.bM; });
    case '../shared/translations/locales/pt-br.json': return import('shared').then(function (n) { return n.bN; });
    case '../shared/translations/locales/pt.json': return import('shared').then(function (n) { return n.bO; });
    case '../shared/translations/locales/ro-md.json': return import('shared').then(function (n) { return n.bP; });
    case '../shared/translations/locales/ro.json': return import('shared').then(function (n) { return n.bQ; });
    case '../shared/translations/locales/ru.json': return import('shared').then(function (n) { return n.bR; });
    case '../shared/translations/locales/si.json': return import('shared').then(function (n) { return n.bS; });
    case '../shared/translations/locales/sk.json': return import('shared').then(function (n) { return n.bT; });
    case '../shared/translations/locales/sl.json': return import('shared').then(function (n) { return n.bU; });
    case '../shared/translations/locales/sq.json': return import('shared').then(function (n) { return n.bV; });
    case '../shared/translations/locales/sr-me.json': return import('shared').then(function (n) { return n.bW; });
    case '../shared/translations/locales/sr.json': return import('shared').then(function (n) { return n.bX; });
    case '../shared/translations/locales/sv.json': return import('shared').then(function (n) { return n.bY; });
    case '../shared/translations/locales/sw-ke.json': return import('shared').then(function (n) { return n.bZ; });
    case '../shared/translations/locales/ta.json': return import('shared').then(function (n) { return n.b_; });
    case '../shared/translations/locales/th.json': return import('shared').then(function (n) { return n.b$; });
    case '../shared/translations/locales/tr.json': return import('shared').then(function (n) { return n.c0; });
    case '../shared/translations/locales/uk.json': return import('shared').then(function (n) { return n.c1; });
    case '../shared/translations/locales/ur-pk.json': return import('shared').then(function (n) { return n.c2; });
    case '../shared/translations/locales/ur.json': return import('shared').then(function (n) { return n.c3; });
    case '../shared/translations/locales/uz.json': return import('shared').then(function (n) { return n.c4; });
    case '../shared/translations/locales/vi.json': return import('shared').then(function (n) { return n.c5; });
    case '../shared/translations/locales/zh-cn.json': return import('shared').then(function (n) { return n.c6; });
    case '../shared/translations/locales/zh-tw.json': return import('shared').then(function (n) { return n.c7; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case '../ticket-fields/translations/locales/af.json': return import('ticket-fields').then(function (n) { return n.b; });
    case '../ticket-fields/translations/locales/ar-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.c; });
    case '../ticket-fields/translations/locales/ar.json': return import('ticket-fields').then(function (n) { return n.d; });
    case '../ticket-fields/translations/locales/az.json': return import('ticket-fields').then(function (n) { return n.e; });
    case '../ticket-fields/translations/locales/be.json': return import('ticket-fields').then(function (n) { return n.f; });
    case '../ticket-fields/translations/locales/bg.json': return import('ticket-fields').then(function (n) { return n.h; });
    case '../ticket-fields/translations/locales/bn.json': return import('ticket-fields').then(function (n) { return n.i; });
    case '../ticket-fields/translations/locales/bs.json': return import('ticket-fields').then(function (n) { return n.j; });
    case '../ticket-fields/translations/locales/ca.json': return import('ticket-fields').then(function (n) { return n.k; });
    case '../ticket-fields/translations/locales/cs.json': return import('ticket-fields').then(function (n) { return n.l; });
    case '../ticket-fields/translations/locales/cy.json': return import('ticket-fields').then(function (n) { return n.m; });
    case '../ticket-fields/translations/locales/da.json': return import('ticket-fields').then(function (n) { return n.n; });
    case '../ticket-fields/translations/locales/de-de.json': return import('ticket-fields').then(function (n) { return n.o; });
    case '../ticket-fields/translations/locales/de-x-informal.json': return import('ticket-fields').then(function (n) { return n.p; });
    case '../ticket-fields/translations/locales/de.json': return import('ticket-fields').then(function (n) { return n.q; });
    case '../ticket-fields/translations/locales/el.json': return import('ticket-fields').then(function (n) { return n.r; });
    case '../ticket-fields/translations/locales/en-001.json': return import('ticket-fields').then(function (n) { return n.s; });
    case '../ticket-fields/translations/locales/en-150.json': return import('ticket-fields').then(function (n) { return n.t; });
    case '../ticket-fields/translations/locales/en-au.json': return import('ticket-fields').then(function (n) { return n.u; });
    case '../ticket-fields/translations/locales/en-ca.json': return import('ticket-fields').then(function (n) { return n.v; });
    case '../ticket-fields/translations/locales/en-gb.json': return import('ticket-fields').then(function (n) { return n.w; });
    case '../ticket-fields/translations/locales/en-my.json': return import('ticket-fields').then(function (n) { return n.x; });
    case '../ticket-fields/translations/locales/en-ph.json': return import('ticket-fields').then(function (n) { return n.y; });
    case '../ticket-fields/translations/locales/en-se.json': return import('ticket-fields').then(function (n) { return n.z; });
    case '../ticket-fields/translations/locales/en-us.json': return import('ticket-fields').then(function (n) { return n.A; });
    case '../ticket-fields/translations/locales/en-x-dev.json': return import('ticket-fields').then(function (n) { return n.B; });
    case '../ticket-fields/translations/locales/en-x-keys.json': return import('ticket-fields').then(function (n) { return n.C; });
    case '../ticket-fields/translations/locales/en-x-obsolete.json': return import('ticket-fields').then(function (n) { return n.E; });
    case '../ticket-fields/translations/locales/en-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.F; });
    case '../ticket-fields/translations/locales/en-x-test.json': return import('ticket-fields').then(function (n) { return n.G; });
    case '../ticket-fields/translations/locales/es-419.json': return import('ticket-fields').then(function (n) { return n.H; });
    case '../ticket-fields/translations/locales/es-ar.json': return import('ticket-fields').then(function (n) { return n.J; });
    case '../ticket-fields/translations/locales/es-cl.json': return import('ticket-fields').then(function (n) { return n.K; });
    case '../ticket-fields/translations/locales/es-es.json': return import('ticket-fields').then(function (n) { return n.L; });
    case '../ticket-fields/translations/locales/es-mx.json': return import('ticket-fields').then(function (n) { return n.M; });
    case '../ticket-fields/translations/locales/es-pe.json': return import('ticket-fields').then(function (n) { return n.N; });
    case '../ticket-fields/translations/locales/es.json': return import('ticket-fields').then(function (n) { return n.O; });
    case '../ticket-fields/translations/locales/et.json': return import('ticket-fields').then(function (n) { return n.P; });
    case '../ticket-fields/translations/locales/eu.json': return import('ticket-fields').then(function (n) { return n.Q; });
    case '../ticket-fields/translations/locales/fa-af.json': return import('ticket-fields').then(function (n) { return n.S; });
    case '../ticket-fields/translations/locales/fa.json': return import('ticket-fields').then(function (n) { return n.U; });
    case '../ticket-fields/translations/locales/fi.json': return import('ticket-fields').then(function (n) { return n.V; });
    case '../ticket-fields/translations/locales/fil.json': return import('ticket-fields').then(function (n) { return n.W; });
    case '../ticket-fields/translations/locales/fo.json': return import('ticket-fields').then(function (n) { return n.X; });
    case '../ticket-fields/translations/locales/fr-ca.json': return import('ticket-fields').then(function (n) { return n.Y; });
    case '../ticket-fields/translations/locales/fr-dz.json': return import('ticket-fields').then(function (n) { return n.Z; });
    case '../ticket-fields/translations/locales/fr-mu.json': return import('ticket-fields').then(function (n) { return n._; });
    case '../ticket-fields/translations/locales/fr.json': return import('ticket-fields').then(function (n) { return n.$; });
    case '../ticket-fields/translations/locales/ga.json': return import('ticket-fields').then(function (n) { return n.a0; });
    case '../ticket-fields/translations/locales/he.json': return import('ticket-fields').then(function (n) { return n.a1; });
    case '../ticket-fields/translations/locales/hi.json': return import('ticket-fields').then(function (n) { return n.a2; });
    case '../ticket-fields/translations/locales/hr.json': return import('ticket-fields').then(function (n) { return n.a3; });
    case '../ticket-fields/translations/locales/hu.json': return import('ticket-fields').then(function (n) { return n.a4; });
    case '../ticket-fields/translations/locales/hy.json': return import('ticket-fields').then(function (n) { return n.a5; });
    case '../ticket-fields/translations/locales/id.json': return import('ticket-fields').then(function (n) { return n.a6; });
    case '../ticket-fields/translations/locales/is.json': return import('ticket-fields').then(function (n) { return n.a7; });
    case '../ticket-fields/translations/locales/it-ch.json': return import('ticket-fields').then(function (n) { return n.a8; });
    case '../ticket-fields/translations/locales/it.json': return import('ticket-fields').then(function (n) { return n.a9; });
    case '../ticket-fields/translations/locales/ja.json': return import('ticket-fields').then(function (n) { return n.aa; });
    case '../ticket-fields/translations/locales/ka.json': return import('ticket-fields').then(function (n) { return n.ab; });
    case '../ticket-fields/translations/locales/kk.json': return import('ticket-fields').then(function (n) { return n.ac; });
    case '../ticket-fields/translations/locales/kl-dk.json': return import('ticket-fields').then(function (n) { return n.ad; });
    case '../ticket-fields/translations/locales/km.json': return import('ticket-fields').then(function (n) { return n.ae; });
    case '../ticket-fields/translations/locales/ko.json': return import('ticket-fields').then(function (n) { return n.af; });
    case '../ticket-fields/translations/locales/ku.json': return import('ticket-fields').then(function (n) { return n.ag; });
    case '../ticket-fields/translations/locales/ky.json': return import('ticket-fields').then(function (n) { return n.ah; });
    case '../ticket-fields/translations/locales/lt.json': return import('ticket-fields').then(function (n) { return n.ai; });
    case '../ticket-fields/translations/locales/lv.json': return import('ticket-fields').then(function (n) { return n.aj; });
    case '../ticket-fields/translations/locales/mk.json': return import('ticket-fields').then(function (n) { return n.ak; });
    case '../ticket-fields/translations/locales/mn.json': return import('ticket-fields').then(function (n) { return n.al; });
    case '../ticket-fields/translations/locales/ms.json': return import('ticket-fields').then(function (n) { return n.am; });
    case '../ticket-fields/translations/locales/mt.json': return import('ticket-fields').then(function (n) { return n.an; });
    case '../ticket-fields/translations/locales/my.json': return import('ticket-fields').then(function (n) { return n.ao; });
    case '../ticket-fields/translations/locales/ne.json': return import('ticket-fields').then(function (n) { return n.ap; });
    case '../ticket-fields/translations/locales/nl-be.json': return import('ticket-fields').then(function (n) { return n.aq; });
    case '../ticket-fields/translations/locales/nl.json': return import('ticket-fields').then(function (n) { return n.ar; });
    case '../ticket-fields/translations/locales/no.json': return import('ticket-fields').then(function (n) { return n.as; });
    case '../ticket-fields/translations/locales/pl.json': return import('ticket-fields').then(function (n) { return n.at; });
    case '../ticket-fields/translations/locales/pt-br.json': return import('ticket-fields').then(function (n) { return n.au; });
    case '../ticket-fields/translations/locales/pt.json': return import('ticket-fields').then(function (n) { return n.av; });
    case '../ticket-fields/translations/locales/ro-md.json': return import('ticket-fields').then(function (n) { return n.aw; });
    case '../ticket-fields/translations/locales/ro.json': return import('ticket-fields').then(function (n) { return n.ax; });
    case '../ticket-fields/translations/locales/ru.json': return import('ticket-fields').then(function (n) { return n.ay; });
    case '../ticket-fields/translations/locales/si.json': return import('ticket-fields').then(function (n) { return n.az; });
    case '../ticket-fields/translations/locales/sk.json': return import('ticket-fields').then(function (n) { return n.aA; });
    case '../ticket-fields/translations/locales/sl.json': return import('ticket-fields').then(function (n) { return n.aB; });
    case '../ticket-fields/translations/locales/sq.json': return import('ticket-fields').then(function (n) { return n.aC; });
    case '../ticket-fields/translations/locales/sr-me.json': return import('ticket-fields').then(function (n) { return n.aD; });
    case '../ticket-fields/translations/locales/sr.json': return import('ticket-fields').then(function (n) { return n.aE; });
    case '../ticket-fields/translations/locales/sv.json': return import('ticket-fields').then(function (n) { return n.aF; });
    case '../ticket-fields/translations/locales/sw-ke.json': return import('ticket-fields').then(function (n) { return n.aG; });
    case '../ticket-fields/translations/locales/ta.json': return import('ticket-fields').then(function (n) { return n.aH; });
    case '../ticket-fields/translations/locales/th.json': return import('ticket-fields').then(function (n) { return n.aI; });
    case '../ticket-fields/translations/locales/tr.json': return import('ticket-fields').then(function (n) { return n.aJ; });
    case '../ticket-fields/translations/locales/uk.json': return import('ticket-fields').then(function (n) { return n.aK; });
    case '../ticket-fields/translations/locales/ur-pk.json': return import('ticket-fields').then(function (n) { return n.aL; });
    case '../ticket-fields/translations/locales/ur.json': return import('ticket-fields').then(function (n) { return n.aM; });
    case '../ticket-fields/translations/locales/uz.json': return import('ticket-fields').then(function (n) { return n.aN; });
    case '../ticket-fields/translations/locales/vi.json': return import('ticket-fields').then(function (n) { return n.aO; });
    case '../ticket-fields/translations/locales/zh-cn.json': return import('ticket-fields').then(function (n) { return n.aP; });
    case '../ticket-fields/translations/locales/zh-tw.json': return import('ticket-fields').then(function (n) { return n.aQ; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case './translations/locales/af.json': return import('service-catalog-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('service-catalog-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('service-catalog-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('service-catalog-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('service-catalog-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('service-catalog-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('service-catalog-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('service-catalog-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('service-catalog-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('service-catalog-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('service-catalog-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('service-catalog-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('service-catalog-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('service-catalog-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('service-catalog-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('service-catalog-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('service-catalog-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('service-catalog-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('service-catalog-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('service-catalog-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('service-catalog-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('service-catalog-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('service-catalog-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('service-catalog-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('service-catalog-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('service-catalog-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('service-catalog-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('service-catalog-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('service-catalog-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('service-catalog-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('service-catalog-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('service-catalog-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('service-catalog-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('service-catalog-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('service-catalog-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('service-catalog-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('service-catalog-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('service-catalog-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('service-catalog-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('service-catalog-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('service-catalog-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('service-catalog-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('service-catalog-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('service-catalog-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('service-catalog-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('service-catalog-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('service-catalog-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('service-catalog-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('service-catalog-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('service-catalog-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('service-catalog-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('service-catalog-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('service-catalog-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('service-catalog-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('service-catalog-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('service-catalog-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('service-catalog-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('service-catalog-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('service-catalog-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('service-catalog-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('service-catalog-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('service-catalog-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('service-catalog-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('service-catalog-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('service-catalog-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('service-catalog-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('service-catalog-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('service-catalog-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('service-catalog-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('service-catalog-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('service-catalog-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('service-catalog-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('service-catalog-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('service-catalog-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('service-catalog-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('service-catalog-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('service-catalog-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('service-catalog-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('service-catalog-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('service-catalog-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('service-catalog-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('service-catalog-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('service-catalog-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('service-catalog-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('service-catalog-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('service-catalog-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('service-catalog-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('service-catalog-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('service-catalog-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('service-catalog-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('service-catalog-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('service-catalog-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('service-catalog-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('service-catalog-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('service-catalog-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('service-catalog-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('service-catalog-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('service-catalog-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('service-catalog-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderServiceCatalogItem(container, settings, props) {
    const { baseLocale, helpCenterPath } = props;
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__(`../ticket-fields/translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime2__(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ServiceCatalogItem, { ...props }) }) }), container);
}

export { renderServiceCatalogItem, renderServiceCatalogList };
