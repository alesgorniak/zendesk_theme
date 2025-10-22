import { r as reactExports, s as styled, c as Field, u as useTranslation, i as debounce, j as jsxRuntimeExports, d as Label, a as MediaInput, ag as SvgSearchStroke, f as Combobox, O as Option, y as Tag, an as Ellipsis, B as getColorV8, ad as MD, A as Anchor, ao as Table, ap as Head, aq as HeaderRow, ar as HeaderCell, as as SortableCell, at as Body, au as Row, av as Cell, aw as Spinner, ax as XXL, a0 as initI18next, a1 as loadTranslations, a2 as reactDomExports, a3 as ThemeProviders, a4 as createTheme, aj as ErrorBoundary, a8 as Grid, aa as Row$1, a9 as Col, F as Field$1, L as Label$1, a6 as Avatar, T as Textarea, M as Message, X as Button, n as notify, ay as Breadcrumb } from 'shared';

function useSearchApprovalRequests() {
    const [approvalRequests, setApprovalRequests] = reactExports.useState([]);
    const [error, setError] = reactExports.useState(null);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    const [approvalRequestStatus, setApprovalRequestStatus] = reactExports.useState("any");
    reactExports.useEffect(() => {
        const fetchApprovalRequests = async () => {
            setIsLoading(true);
            try {
                const currentUserRequest = await fetch("/api/v2/users/me.json");
                if (!currentUserRequest.ok) {
                    throw new Error("Error fetching current user data");
                }
                const currentUser = await currentUserRequest.json();
                // TODO: can be any ULID, the API was implemented this way for future proofing, we will likely need to update the route in the UI to match
                const approvalWorkflowInstanceId = "01JJQFNX5ADZ6PRQCFWRDNKZRD";
                const response = await fetch(`/api/v2/approval_workflow_instances/${approvalWorkflowInstanceId}/approval_requests/search${approvalRequestStatus === "any"
                    ? ""
                    : `?status=${approvalRequestStatus}`}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": currentUser.user.authenticity_token,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setApprovalRequests(data.approval_requests);
                }
                else {
                    throw new Error("Error fetching approval requests");
                }
            }
            catch (error) {
                setError(error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchApprovalRequests();
    }, [approvalRequestStatus]);
    return {
        approvalRequests,
        errorFetchingApprovalRequests: error,
        approvalRequestStatus,
        setApprovalRequestStatus,
        isLoading: isLoading,
    };
}

const APPROVAL_REQUEST_STATES = {
    ACTIVE: "active",
    APPROVED: "approved",
    REJECTED: "rejected",
    WITHDRAWN: "withdrawn",
};

const FiltersContainer = styled.div `
  display: flex;
  gap: ${(props) => props.theme.space.base * 17}px; /* 68px */
  align-items: flex-end;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: normal;
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;
const SearchField = styled(Field) `
  flex: 3;
`;
const DropdownFilterField = styled(Field) `
  flex: 1;
`;
function ApprovalRequestListFilters({ approvalRequestStatus, setApprovalRequestStatus, setSearchTerm, }) {
    const { t } = useTranslation();
    const getStatusLabel = reactExports.useCallback((status) => {
        switch (status) {
            case "any":
                return t("approval-requests.list.status-dropdown.any", "Any");
            case "active":
                return t("approval-requests.status.decision-pending", "Decision pending");
            case "approved":
                return t("approval-requests.status.approved", "Approved");
            case "rejected":
                return t("approval-requests.status.denied", "Denied");
            case "withdrawn":
                return t("approval-requests.status.withdrawn", "Withdrawn");
        }
    }, [t]);
    const handleChange = reactExports.useCallback((changes) => {
        if (!changes.selectionValue) {
            return;
        }
        setApprovalRequestStatus(changes.selectionValue);
        setSearchTerm(""); // Reset search term when changing status
    }, [setApprovalRequestStatus, setSearchTerm]);
    const debouncedSetSearchTerm = reactExports.useMemo(() => debounce((value) => setSearchTerm(value), 300), [setSearchTerm]);
    const handleSearch = reactExports.useCallback((event) => {
        debouncedSetSearchTerm(event.target.value);
    }, [debouncedSetSearchTerm]);
    return (jsxRuntimeExports.jsxs(FiltersContainer, { children: [jsxRuntimeExports.jsxs(SearchField, { children: [jsxRuntimeExports.jsx(Label, { hidden: true, children: t("approval-requests.list.search-placeholder", "Search approval requests") }), jsxRuntimeExports.jsx(MediaInput, { start: jsxRuntimeExports.jsx(SvgSearchStroke, {}), placeholder: t("approval-requests.list.search-placeholder", "Search approval requests"), onChange: handleSearch })] }), jsxRuntimeExports.jsxs(DropdownFilterField, { children: [jsxRuntimeExports.jsx(Label, { children: t("approval-requests.list.status-dropdown.label_v2", "Status") }), jsxRuntimeExports.jsxs(Combobox, { isEditable: false, onChange: handleChange, selectionValue: approvalRequestStatus, inputValue: getStatusLabel(approvalRequestStatus), children: [jsxRuntimeExports.jsx(Option, { value: "any", label: t("approval-requests.list.status-dropdown.any", "Any") }), jsxRuntimeExports.jsx(Option, { value: APPROVAL_REQUEST_STATES.ACTIVE, label: t("approval-requests.status.decision-pending", "Decision pending") }), jsxRuntimeExports.jsx(Option, { value: APPROVAL_REQUEST_STATES.APPROVED, label: t("approval-requests.status.approved", "Approved") }), jsxRuntimeExports.jsx(Option, { value: APPROVAL_REQUEST_STATES.REJECTED, label: t("approval-requests.status.denied", "Denied") }), jsxRuntimeExports.jsx(Option, { value: APPROVAL_REQUEST_STATES.WITHDRAWN, label: t("approval-requests.status.withdrawn", "Withdrawn") })] })] })] }));
}
var ApprovalRequestListFilters$1 = reactExports.memo(ApprovalRequestListFilters);

const DEFAULT_STATUS_CONFIG = { hue: "grey", label: "Unknown status" };
function ApprovalStatusTag({ status }) {
    const { t } = useTranslation();
    const statusTagMap = {
        [APPROVAL_REQUEST_STATES.ACTIVE]: {
            hue: "blue",
            label: t("approval-requests.status.decision-pending", "Decision pending"),
        },
        [APPROVAL_REQUEST_STATES.APPROVED]: {
            hue: "green",
            label: t("approval-requests.status.approved", "Approved"),
        },
        [APPROVAL_REQUEST_STATES.REJECTED]: {
            hue: "red",
            label: t("approval-requests.status.denied", "Denied"),
        },
        [APPROVAL_REQUEST_STATES.WITHDRAWN]: {
            hue: "grey",
            label: t("approval-requests.status.withdrawn", "Withdrawn"),
        },
    };
    const config = statusTagMap[status] || DEFAULT_STATUS_CONFIG;
    return (jsxRuntimeExports.jsx(Tag, { hue: config.hue, children: jsxRuntimeExports.jsx(Ellipsis, { children: config.label }) }));
}
var ApprovalStatusTag$1 = reactExports.memo(ApprovalStatusTag);

const formatApprovalRequestDate = (timestamp, locale, monthFormat = "short") => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString(locale, {
        month: monthFormat,
        day: "numeric",
        year: "numeric",
    })} ${date.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })}`;
};

const StyledMD = styled(MD) `
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
function NoApprovalRequestsText() {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsx(StyledMD, { children: t("approval-requests.list.no-requests", "No approval requests found.") }));
}
var NoApprovalRequestsText$1 = reactExports.memo(NoApprovalRequestsText);

const ApprovalRequestAnchor = styled(Anchor) `
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;
const sortableCellProps = {
    style: {
        paddingTop: "22px",
        paddingBottom: "22px",
    },
    isTruncated: true,
};
function ApprovalRequestListTable({ approvalRequests, helpCenterPath, baseLocale, sortDirection, onSortChange, }) {
    const { t } = useTranslation();
    const handleSortClick = () => {
        if (sortDirection === "asc") {
            onSortChange("desc");
        }
        else if (sortDirection === "desc") {
            onSortChange(undefined);
        }
        else {
            onSortChange("asc");
        }
    };
    return (jsxRuntimeExports.jsxs(Table, { size: "large", children: [jsxRuntimeExports.jsx(Head, { children: jsxRuntimeExports.jsxs(HeaderRow, { children: [jsxRuntimeExports.jsx(HeaderCell, { width: "40%", isTruncated: true, children: t("approval-requests.list.table.subject", "Subject") }), jsxRuntimeExports.jsx(HeaderCell, { isTruncated: true, children: t("approval-requests.list.table.requester", "Requester") }), jsxRuntimeExports.jsx(HeaderCell, { isTruncated: true, children: t("approval-requests.list.table.sent-by", "Sent by") }), jsxRuntimeExports.jsx(SortableCell, { onClick: handleSortClick, sort: sortDirection, cellProps: sortableCellProps, children: t("approval-requests.list.table.sent-on", "Sent on") }), jsxRuntimeExports.jsx(HeaderCell, { isTruncated: true, children: t("approval-requests.list.table.approval-status", "Approval status") })] }) }), jsxRuntimeExports.jsx(Body, { children: approvalRequests.length === 0 ? (jsxRuntimeExports.jsx(Row, { children: jsxRuntimeExports.jsx(Cell, { colSpan: 5, children: jsxRuntimeExports.jsx(NoApprovalRequestsText$1, {}) }) })) : (approvalRequests.map((approvalRequest) => (jsxRuntimeExports.jsxs(Row, { children: [jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: jsxRuntimeExports.jsx(ApprovalRequestAnchor, { href: `${helpCenterPath}/approval_requests/${approvalRequest.id}`, children: approvalRequest.subject }) }), jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: approvalRequest.requester_name }), jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: approvalRequest.created_by_name }), jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: formatApprovalRequestDate(approvalRequest.created_at, baseLocale) }), jsxRuntimeExports.jsx(Cell, { isTruncated: true, children: jsxRuntimeExports.jsx(ApprovalStatusTag$1, { status: approvalRequest.status }) })] }, approvalRequest.id)))) })] }));
}
var ApprovalRequestListTable$1 = reactExports.memo(ApprovalRequestListTable);

const Container$3 = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-top: ${(props) => props.theme.space.xl}; /* 40px */
`;
const LoadingContainer$1 = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ApprovalRequestListPage({ baseLocale, helpCenterPath, }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = reactExports.useState("");
    const [sortDirection, setSortDirection] = reactExports.useState(undefined);
    const { approvalRequests, errorFetchingApprovalRequests: error, approvalRequestStatus, setApprovalRequestStatus, isLoading, } = useSearchApprovalRequests();
    const sortedAndFilteredApprovalRequests = reactExports.useMemo(() => {
        let results = [...approvalRequests];
        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter((request) => request.subject.toLowerCase().includes(term));
        }
        // Apply sorting
        if (sortDirection) {
            results.sort((a, b) => {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
            });
        }
        return results;
    }, [approvalRequests, searchTerm, sortDirection]);
    if (error) {
        throw error;
    }
    if (isLoading) {
        return (jsxRuntimeExports.jsx(LoadingContainer$1, { children: jsxRuntimeExports.jsx(Spinner, { size: "64" }) }));
    }
    return (jsxRuntimeExports.jsxs(Container$3, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: t("approval-requests.list.header", "Approval requests") }), jsxRuntimeExports.jsx(ApprovalRequestListFilters$1, { approvalRequestStatus: approvalRequestStatus, setApprovalRequestStatus: setApprovalRequestStatus, setSearchTerm: setSearchTerm }), approvalRequests.length === 0 ? (jsxRuntimeExports.jsx(NoApprovalRequestsText$1, {})) : (jsxRuntimeExports.jsx(ApprovalRequestListTable$1, { approvalRequests: sortedAndFilteredApprovalRequests, baseLocale: baseLocale, helpCenterPath: helpCenterPath, sortDirection: sortDirection, onSortChange: setSortDirection }))] }));
}
var ApprovalRequestListPage$1 = reactExports.memo(ApprovalRequestListPage);

function __variableDynamicImportRuntime1__$1(path) {
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

function __variableDynamicImportRuntime0__$1(path) {
  switch (path) {
    case './translations/locales/af.json': return import('approval-requests-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('approval-requests-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('approval-requests-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('approval-requests-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('approval-requests-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('approval-requests-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('approval-requests-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('approval-requests-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('approval-requests-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('approval-requests-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('approval-requests-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('approval-requests-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('approval-requests-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('approval-requests-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('approval-requests-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('approval-requests-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('approval-requests-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('approval-requests-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('approval-requests-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('approval-requests-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('approval-requests-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('approval-requests-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('approval-requests-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('approval-requests-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('approval-requests-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('approval-requests-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('approval-requests-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('approval-requests-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('approval-requests-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('approval-requests-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('approval-requests-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('approval-requests-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('approval-requests-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('approval-requests-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('approval-requests-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('approval-requests-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('approval-requests-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('approval-requests-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('approval-requests-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('approval-requests-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('approval-requests-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('approval-requests-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('approval-requests-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('approval-requests-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('approval-requests-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('approval-requests-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('approval-requests-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('approval-requests-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('approval-requests-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('approval-requests-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('approval-requests-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('approval-requests-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('approval-requests-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('approval-requests-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('approval-requests-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('approval-requests-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('approval-requests-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('approval-requests-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('approval-requests-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('approval-requests-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('approval-requests-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('approval-requests-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('approval-requests-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('approval-requests-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('approval-requests-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('approval-requests-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('approval-requests-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('approval-requests-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('approval-requests-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('approval-requests-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('approval-requests-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('approval-requests-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('approval-requests-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('approval-requests-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('approval-requests-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('approval-requests-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('approval-requests-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('approval-requests-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('approval-requests-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('approval-requests-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('approval-requests-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('approval-requests-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('approval-requests-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('approval-requests-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('approval-requests-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('approval-requests-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('approval-requests-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('approval-requests-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('approval-requests-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('approval-requests-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('approval-requests-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('approval-requests-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('approval-requests-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('approval-requests-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('approval-requests-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('approval-requests-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('approval-requests-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('approval-requests-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('approval-requests-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('approval-requests-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('approval-requests-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderApprovalRequestList(container, settings, props, helpCenterPath) {
    const { baseLocale } = props;
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__$1(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__$1(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ApprovalRequestListPage$1, { ...props, helpCenterPath: helpCenterPath }) }) }), container);
}

const Container$2 = styled.div `
  border-top: ${(props) => `1px solid ${getColorV8("grey", 300, props.theme)}`};
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.theme.space.base * 4}px; /* 16px */
`;
const PreviousDecisionTitle = styled(MD) `
  margin-bottom: ${(props) => props.theme.space.xxs}; /* 4px */
`;
const FieldLabel$2 = styled(MD) `
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
function getPreviousDecisionFallbackLabel(status) {
    switch (status) {
        case APPROVAL_REQUEST_STATES.APPROVED:
            return "Approved";
        case APPROVAL_REQUEST_STATES.REJECTED:
            return "Rejected";
        default:
            return status;
    }
}
function ApprovalRequestPreviousDecision({ decision, baseLocale, }) {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsx(PreviousDecisionTitle, { children: t("approval-requests.request.approval-request-details.previous-decision", "Previous decision") }), jsxRuntimeExports.jsxs(FieldLabel$2, { children: [t(`approval-requests.request.approval-request-details.${decision.status.toLowerCase()}`, getPreviousDecisionFallbackLabel(decision.status)), " ", formatApprovalRequestDate(decision.decided_at ?? "", baseLocale)] }), decision.decision_notes && (
            // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
            jsxRuntimeExports.jsx(FieldLabel$2, { children: `"${decision.decision_notes}"` }))] }));
}
var ApprovalRequestPreviousDecision$1 = reactExports.memo(ApprovalRequestPreviousDecision);

const Container$1 = styled(Grid) `
  padding: ${(props) => props.theme.space.base * 6}px; /* 24px */
  margin-left: 0;
  background: ${(props) => getColorV8("background", 650, props.theme)};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
  max-width: 296px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 100%;
  }
`;
const ApprovalRequestHeader = styled(MD) `
  margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
`;
const WrappedText = styled(MD) `
  white-space: normal;
  overflow-wrap: break-word;
`;
const FieldLabel$1 = styled(MD) `
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
const DetailRow = styled(Row$1) `
  margin-bottom: ${(props) => props.theme.space.sm}; /* 12px */

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column; /* stack columns vertically */

    > div {
      width: 100% !important; /* full width for each Col */
      max-width: 100% !important;
      flex: none !important;
      margin-bottom: ${(props) => props.theme.space.xxs}; /* 4px */
    }

    > div:last-child {
      margin-bottom: 0;
    }
  }
`;
function ApprovalRequestDetails({ approvalRequest, baseLocale, }) {
    const { t } = useTranslation();
    const shouldShowApprovalRequestComment = approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
        ? Boolean(approvalRequest.withdrawn_reason)
        : approvalRequest.decisions.length > 0;
    const shouldShowPreviousDecision = approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN &&
        approvalRequest.decisions.length > 0;
    return (jsxRuntimeExports.jsxs(Container$1, { children: [jsxRuntimeExports.jsx(ApprovalRequestHeader, { isBold: true, children: t("approval-requests.request.approval-request-details.header", "Approval request details") }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.sent-by", "Sent by") }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(WrappedText, { children: approvalRequest.created_by_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.sent-on", "Sent on") }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: formatApprovalRequestDate(approvalRequest.created_at, baseLocale) }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.approver", "Approver") }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(WrappedText, { children: approvalRequest.assignee_user.name }) })] }), jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.status", "Status") }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: jsxRuntimeExports.jsx(ApprovalStatusTag$1, { status: approvalRequest.status }) }) })] }), shouldShowApprovalRequestComment && (jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t("approval-requests.request.approval-request-details.comment", "Comment") }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(WrappedText, { children: approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                                ? approvalRequest.withdrawn_reason
                                : approvalRequest.decisions[0]?.decision_notes ?? "-" }) })] })), approvalRequest.decided_at && (jsxRuntimeExports.jsxs(DetailRow, { children: [jsxRuntimeExports.jsx(Col, { size: 4, children: jsxRuntimeExports.jsx(FieldLabel$1, { children: t(approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                                ? "approval-requests.request.approval-request-details.withdrawn-on"
                                : "approval-requests.request.approval-request-details.decided", approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                                ? "Withdrawn on"
                                : "Decided") }) }), jsxRuntimeExports.jsx(Col, { size: 8, children: jsxRuntimeExports.jsx(MD, { children: formatApprovalRequestDate(approvalRequest.decided_at, baseLocale) }) })] })), shouldShowPreviousDecision && approvalRequest.decisions[0] && (jsxRuntimeExports.jsx(ApprovalRequestPreviousDecision$1, { decision: approvalRequest.decisions[0], baseLocale: baseLocale }))] }));
}
var ApprovalRequestDetails$1 = reactExports.memo(ApprovalRequestDetails);

const TicketContainer = styled(Grid) `
  padding: ${(props) => props.theme.space.md}; /* 20px */
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
`;
const TicketDetailsHeader = styled(MD) `
  margin-bottom: ${(props) => props.theme.space.md}; /* 20px */
`;
const FieldLabel = styled(MD) `
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
const MultiselectTag = styled(Tag) `
  margin-inline-end: ${(props) => props.theme.space.xxs}; /* 4px */
`;
const CustomFieldsGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.space.md}; /* 20px */
  margin-top: ${(props) => props.theme.space.md}; /* 20px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const NULL_VALUE_PLACEHOLDER = "-";
function CustomFieldValue({ value, }) {
    const { t } = useTranslation();
    if (Array.isArray(value) && value.length > 0) {
        return (jsxRuntimeExports.jsx(MD, { children: value.map((val) => (jsxRuntimeExports.jsx(MultiselectTag, { hue: "grey", children: val }, val))) }));
    }
    if (typeof value === "boolean") {
        return (jsxRuntimeExports.jsx(MD, { children: value
                ? t("approval-requests.request.ticket-details.checkbox-value.yes", "Yes")
                : t("approval-requests.request.ticket-details.checkbox-value.no", "No") }));
    }
    if (!value || (Array.isArray(value) && value.length === 0)) {
        return jsxRuntimeExports.jsx(MD, { children: NULL_VALUE_PLACEHOLDER });
    }
    return jsxRuntimeExports.jsx(MD, { children: value });
}
const TicketPriorityKeys = {
    Low: "approval-requests.request.ticket-details.priority_low",
    Normal: "approval-requests.request.ticket-details.priority_normal",
    High: "approval-requests.request.ticket-details.priority_high",
    Urgent: "approval-requests.request.ticket-details.priority_urgent",
};
function ApprovalTicketDetails({ ticket }) {
    const { t } = useTranslation();
    const displayPriority = TicketPriorityKeys[ticket.priority]
        ? t(TicketPriorityKeys[ticket.priority], ticket.priority)
        : ticket.priority;
    return (jsxRuntimeExports.jsxs(TicketContainer, { children: [jsxRuntimeExports.jsx(TicketDetailsHeader, { isBold: true, children: t("approval-requests.request.ticket-details.header", "Ticket details") }), jsxRuntimeExports.jsxs(CustomFieldsGrid, { children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: t("approval-requests.request.ticket-details.requester", "Requester") }), jsxRuntimeExports.jsx(MD, { children: ticket.requester.name })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: t("approval-requests.request.ticket-details.id", "ID") }), jsxRuntimeExports.jsx(MD, { children: ticket.id })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: t("approval-requests.request.ticket-details.priority", "Priority") }), jsxRuntimeExports.jsx(MD, { children: displayPriority })] }), ticket.custom_fields.map((field) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(FieldLabel, { children: field.title_in_portal }), jsxRuntimeExports.jsx(CustomFieldValue, { value: field.value })] }, String(field.id))))] })] }));
}
var ApprovalTicketDetails$1 = reactExports.memo(ApprovalTicketDetails);

async function submitApprovalDecision(approvalWorkflowInstanceId, approvalRequestId, decision, decisionNote) {
    try {
        const currentUserRequest = await fetch("/api/v2/users/me.json");
        if (!currentUserRequest.ok) {
            throw new Error("Error fetching current user data");
        }
        const currentUser = await currentUserRequest.json();
        const response = await fetch(`/api/v2/approval_workflow_instances/${approvalWorkflowInstanceId}/approval_requests/${approvalRequestId}/decision`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": currentUser.user.authenticity_token,
            },
            body: JSON.stringify({
                status: decision,
                notes: decisionNote,
            }),
        });
        return response;
    }
    catch (error) {
        console.error("Error submitting approval decision:", error);
        throw error;
    }
}

const PENDING_APPROVAL_STATUS = {
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
};
const ButtonContainer = styled.div `
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space.md}; /* 20px */
  margin-inline-start: ${(props) => props.hasAvatar ? "55px" : "0"}; // avatar width + margin + border

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: ${(props) => props.isSubmitButton ? "row-reverse" : "column"};
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;
const CommentSection = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;
const TextAreaContainer = styled.div `
  display: flex;
  gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  margin-top: ${(props) => props.theme.space.base * 6}px; /* 24px */
  align-items: flex-start;
`;
const TextAreaAndMessage = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;
`;
function ApproverActions({ approvalRequestId, approvalWorkflowInstanceId, setApprovalRequest, assigneeUser, }) {
    const { t } = useTranslation();
    const [comment, setComment] = reactExports.useState("");
    const [pendingStatus, setPendingStatus] = reactExports.useState(null);
    const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
    const [showValidation, setShowValidation] = reactExports.useState(false);
    const isCommentValid = pendingStatus !== PENDING_APPROVAL_STATUS.REJECTED || comment.trim() !== "";
    const shouldShowValidationError = showValidation && !isCommentValid;
    const handleApproveRequestClick = reactExports.useCallback(() => {
        setPendingStatus(PENDING_APPROVAL_STATUS.APPROVED);
        setShowValidation(false);
    }, []);
    const handleDenyRequestClick = reactExports.useCallback(() => {
        setPendingStatus(PENDING_APPROVAL_STATUS.REJECTED);
        setShowValidation(false);
    }, []);
    const handleInputValueChange = reactExports.useCallback((e) => {
        setComment(e.target.value);
    }, []);
    const handleCancelClick = reactExports.useCallback(() => {
        setPendingStatus(null);
        setComment("");
        setShowValidation(false);
    }, []);
    const handleSubmitDecisionClick = async () => {
        setShowValidation(true);
        if (!pendingStatus || !isCommentValid)
            return;
        setIsSubmitting(true);
        try {
            const decision = pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
                ? APPROVAL_REQUEST_STATES.APPROVED
                : APPROVAL_REQUEST_STATES.REJECTED;
            const response = await submitApprovalDecision(approvalWorkflowInstanceId, approvalRequestId, decision, comment);
            if (response.ok) {
                const data = await response.json();
                setApprovalRequest(data.approval_request);
                const notificationTitle = decision === APPROVAL_REQUEST_STATES.APPROVED
                    ? t("approval-requests.request.notification.approval-submitted", "Approval submitted")
                    : t("approval-requests.request.notification.denial-submitted", "Denial submitted");
                notify({
                    type: "success",
                    title: notificationTitle,
                    message: "",
                });
            }
            else {
                throw new Error(`Failed to submit ${decision} decision`);
            }
        }
        catch (error) {
            notify({
                type: "error",
                title: "Error submitting decision",
                message: "Please try again later",
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (pendingStatus) {
        const fieldLabel = pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
            ? t("approval-requests.request.approver-actions.additional-note-label", "Additional note")
            : t("approval-requests.request.approver-actions.denial-reason-label", "Reason for denial* (Required)");
        const shouldShowAvatar = Boolean(assigneeUser?.photo?.content_url);
        return (jsxRuntimeExports.jsxs(CommentSection, { children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label$1, { children: fieldLabel }), jsxRuntimeExports.jsxs(TextAreaContainer, { children: [shouldShowAvatar && (jsxRuntimeExports.jsx(Avatar, { children: jsxRuntimeExports.jsx("img", { alt: "Assignee avatar", src: assigneeUser.photo.content_url ?? undefined }) })), jsxRuntimeExports.jsxs(TextAreaAndMessage, { children: [jsxRuntimeExports.jsx(Textarea, { minRows: 5, value: comment, onChange: handleInputValueChange, disabled: isSubmitting, validation: shouldShowValidationError ? "error" : undefined }), shouldShowValidationError && (jsxRuntimeExports.jsx(Message, { validation: "error", children: t("approval-requests.request.approver-actions.denial-reason-validation", "Enter a reason for denial") }))] })] })] }), jsxRuntimeExports.jsxs(ButtonContainer, { hasAvatar: shouldShowAvatar, isSubmitButton: true, children: [jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleSubmitDecisionClick, disabled: isSubmitting, children: pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
                                ? t("approval-requests.request.approver-actions.submit-approval", "Submit approval")
                                : t("approval-requests.request.approver-actions.submit-denial", "Submit denial") }), jsxRuntimeExports.jsx(Button, { onClick: handleCancelClick, disabled: isSubmitting, children: t("approval-requests.request.approver-actions.cancel", "Cancel") })] })] }));
    }
    return (jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleApproveRequestClick, children: t("approval-requests.request.approver-actions.approve-request", "Approve request") }), jsxRuntimeExports.jsx(Button, { onClick: handleDenyRequestClick, children: t("approval-requests.request.approver-actions.deny-request", "Deny request") })] }));
}
var ApproverActions$1 = reactExports.memo(ApproverActions);

function useApprovalRequest(approvalWorkflowInstanceId, approvalRequestId) {
    const [approvalRequest, setApprovalRequest] = reactExports.useState();
    const [error, setError] = reactExports.useState(null);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    reactExports.useEffect(() => {
        const fetchApprovalRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/v2/approval_workflow_instances/${approvalWorkflowInstanceId}/approval_requests/${approvalRequestId}`);
                if (response.ok) {
                    const data = await response.json();
                    setApprovalRequest(data.approval_request);
                }
                else {
                    throw new Error("Error fetching approval request");
                }
            }
            catch (error) {
                setError(error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchApprovalRequest();
    }, [approvalRequestId, approvalWorkflowInstanceId]);
    return {
        approvalRequest,
        errorFetchingApprovalRequest: error,
        isLoading,
        setApprovalRequest,
    };
}

const StyledBreadcrumb = styled(Breadcrumb) `
  margin-top: ${(props) => props.theme.space.lg}; /* 32px */
`;
const BreadcrumbAnchor = styled(Anchor) `
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;
function ApprovalRequestBreadcrumbs({ organizations, helpCenterPath, }) {
    const { t } = useTranslation();
    const defaultOrganizationName = organizations.length > 0 ? organizations[0]?.name : null;
    if (defaultOrganizationName) {
        return (jsxRuntimeExports.jsxs(StyledBreadcrumb, { children: [jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: helpCenterPath, children: defaultOrganizationName }), jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: `${helpCenterPath}/approval_requests`, children: t("approval-requests.list.header", "Approval requests") })] }));
    }
    return (jsxRuntimeExports.jsx(StyledBreadcrumb, { children: jsxRuntimeExports.jsx(BreadcrumbAnchor, { href: `${helpCenterPath}/approval_requests`, children: t("approval-requests.list.header", "Approval requests") }) }));
}
var ApprovalRequestBreadcrumbs$1 = reactExports.memo(ApprovalRequestBreadcrumbs);

const Container = styled.div `
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.theme.space.xl}; /* 40px */
  margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.space.xl}; /* 40px */
  }
`;
const LoadingContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftColumn = styled.div `
  flex: 2;

  & > *:first-child {
    margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }

  & > *:not(:first-child) {
    margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;
const RightColumn = styled.div `
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.base * 6}px; /* 24px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-start: 0;
  }
`;
const ApproverActionsInLeft = styled.div `
  display: block;
  margin-top: ${(props) => props.theme.space.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;
const ApproverActionsBelowContainer = styled.div `
  display: none;
  margin-top: ${(props) => props.theme.space.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: block;
  }
`;
function ApprovalRequestPage({ approvalWorkflowInstanceId, approvalRequestId, baseLocale, helpCenterPath, organizations, userId, }) {
    const { approvalRequest, setApprovalRequest, errorFetchingApprovalRequest: error, isLoading, } = useApprovalRequest(approvalWorkflowInstanceId, approvalRequestId);
    if (error) {
        throw error;
    }
    if (isLoading) {
        return (jsxRuntimeExports.jsx(LoadingContainer, { children: jsxRuntimeExports.jsx(Spinner, { size: "64" }) }));
    }
    const showApproverActions = userId === approvalRequest?.assignee_user?.id &&
        approvalRequest?.status === "active";
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(ApprovalRequestBreadcrumbs$1, { helpCenterPath: helpCenterPath, organizations: organizations }), jsxRuntimeExports.jsxs(Container, { children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(XXL, { isBold: true, children: approvalRequest?.subject }), jsxRuntimeExports.jsx(MD, { children: approvalRequest?.message }), approvalRequest?.ticket_details && (jsxRuntimeExports.jsx(ApprovalTicketDetails$1, { ticket: approvalRequest.ticket_details })), showApproverActions && (jsxRuntimeExports.jsx(ApproverActionsInLeft, { children: jsxRuntimeExports.jsx(ApproverActions$1, { approvalWorkflowInstanceId: approvalWorkflowInstanceId, approvalRequestId: approvalRequestId, setApprovalRequest: setApprovalRequest, assigneeUser: approvalRequest?.assignee_user }) }))] }), jsxRuntimeExports.jsx(RightColumn, { children: approvalRequest && (jsxRuntimeExports.jsx(ApprovalRequestDetails$1, { approvalRequest: approvalRequest, baseLocale: baseLocale })) })] }), showApproverActions && (jsxRuntimeExports.jsx(ApproverActionsBelowContainer, { children: jsxRuntimeExports.jsx(ApproverActions$1, { approvalWorkflowInstanceId: approvalWorkflowInstanceId, approvalRequestId: approvalRequestId, setApprovalRequest: setApprovalRequest, assigneeUser: approvalRequest?.assignee_user }) }))] }));
}
var ApprovalRequestPage$1 = reactExports.memo(ApprovalRequestPage);

function __variableDynamicImportRuntime1__(path) {
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

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case './translations/locales/af.json': return import('approval-requests-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('approval-requests-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('approval-requests-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('approval-requests-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('approval-requests-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('approval-requests-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('approval-requests-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('approval-requests-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('approval-requests-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('approval-requests-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('approval-requests-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('approval-requests-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('approval-requests-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('approval-requests-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('approval-requests-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('approval-requests-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('approval-requests-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('approval-requests-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('approval-requests-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('approval-requests-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('approval-requests-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('approval-requests-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('approval-requests-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('approval-requests-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('approval-requests-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('approval-requests-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('approval-requests-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('approval-requests-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('approval-requests-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('approval-requests-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('approval-requests-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('approval-requests-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('approval-requests-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('approval-requests-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('approval-requests-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('approval-requests-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('approval-requests-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('approval-requests-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('approval-requests-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('approval-requests-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('approval-requests-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('approval-requests-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('approval-requests-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('approval-requests-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('approval-requests-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('approval-requests-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('approval-requests-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('approval-requests-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('approval-requests-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('approval-requests-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('approval-requests-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('approval-requests-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('approval-requests-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('approval-requests-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('approval-requests-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('approval-requests-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('approval-requests-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('approval-requests-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('approval-requests-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('approval-requests-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('approval-requests-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('approval-requests-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('approval-requests-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('approval-requests-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('approval-requests-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('approval-requests-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('approval-requests-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('approval-requests-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('approval-requests-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('approval-requests-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('approval-requests-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('approval-requests-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('approval-requests-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('approval-requests-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('approval-requests-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('approval-requests-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('approval-requests-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('approval-requests-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('approval-requests-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('approval-requests-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('approval-requests-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('approval-requests-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('approval-requests-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('approval-requests-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('approval-requests-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('approval-requests-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('approval-requests-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('approval-requests-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('approval-requests-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('approval-requests-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('approval-requests-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('approval-requests-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('approval-requests-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('approval-requests-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('approval-requests-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('approval-requests-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('approval-requests-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('approval-requests-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('approval-requests-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('approval-requests-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('approval-requests-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderApprovalRequest(container, settings, props, helpCenterPath) {
    const { baseLocale } = props;
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ApprovalRequestPage$1, { ...props, helpCenterPath: helpCenterPath }) }) }), container);
}

export { renderApprovalRequest, renderApprovalRequestList };
