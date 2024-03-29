const dashboard = [
    {
        "title": "Vehicle Logistics",
        "icon": "bxs:chart",
        "sub": [
            {
                "title": "Finance AR",
                "path": "/financear"
            },
            {
                "title": "Revenue",
                "path": "/revenue"
            },
            {
                "title": "Operating Cost",
                "path": "/operating-cost"
            },
            {
                "title": "Utilisasi Unit",
                "path": "/utilisasi-unit"
            }
        ]
    }
]
const monitoringPoUnit = [
    {
        "title": "Monitoring PO Unit",
        "icon": "fa6-solid:car-side",
        "path": "/pounit"
    }
]
const generalData = [
    {
        "title": "Common",
        "path": "/common",
        "icon": "bi:grid-3x2-gap-fill"
    },
    {
        "title": "Driver",
        "path": "/driver",
        "icon": "mingcute:steering-wheel-fill"
    },
    {
        "title": "Armada",
        "path": "/armada",
        "icon": "fa-solid:truck"
    },
    {
        "title": "Branch",
        "path": "/branch",
        "icon": "clarity:organization-solid"
    },
    {
        "title": "Customers",
        "path": "/customers",
        "icon": "fluent:people-team-20-filled"
    }
]

const application = [
    {
        "title": "Vehicle Logistics",
        "icon": "fa-solid:truck",
        "sub": [
            {
                "title": "Data General",
                "icon": "bi:clipboard-data-fill",
                "sub": [
                    {
                        "title": "Contract",
                        "path": "/contract"
                    },
                    {
                        "title": "PO Customer",
                        "path": "/pocustomer"
                    }
                ]
            },
            {
                "title": "Operational",
                "icon": "ep:operation",
                "sub": [
                    {
                        "title": "Plan Driver",
                        "path": "/plan-driver"
                    },
                    {
                        "title": "Plan Armada",
                        "path": "/plan-armada"
                    },
                    {
                        "title": "Manifest",
                        "path": "/manifest"
                    },
                    {
                        "title": "Transit Out",
                        "path": "/transit-out"
                    },
                    {
                        "title": "Loading",
                        "path": "/loading"
                    },
                    {
                        "title": "B.A.S.T",
                        "path": "/bast"
                    },
                    {
                        "title": "Unloading",
                        "path": "/unloading"
                    },
                ]
            },
            {
                "title": "Finance",
                "icon": "fa-solid:file-invoice-dollar",
                "sub": [
                    {
                        "title": "Invoice",
                        "path": "/invoice"
                    },
                    {
                        "title": "Invoice Verification",
                        "path": "/invoice-verification"
                    }
                ]
            },
            {
                "title": "Accounting / RC",
                "icon": "map:accounting",
                "sub": [
                    {
                        "title": "Account Receivable",
                        "path": "/account-receivable"
                    },
                    {
                        "title": "Payment",
                        "path": "/payment"
                    }
                ]
            }
        ]
    }
]

const report = [
    {
        "title": "Vehicle Logistics",
        "icon": "fluent:document-bullet-list-24-filled",
        "sub": [
            {
                "title": "Delivery Order",
                "path": "/report-delivery-order"
            },
            {
                "title": "Account Receivables",
                "path": "/account-receivables"
            },
            {
                "title": "Report Revenue",
                "path": "/report-revenue"
            },
            {
                "title": "Report Revenue By Unit",
                "path": "/report-revenue-unit"
            },
            {
                "title": "Transp Report BOP",
                "path": "/transp-reportbop"
            },
            {
                "title": "Transp Report Cargo",
                "path": "/transp-reportcargo"
            }
        ]
    }
]

const administrator = [
    {
        "title": "Configuration",
        "icon": "ci:settings-filled",
        "sub": [
            {
                "title": "Menu",
                "path": "/menu"
            },
            {
                "title": "Approval Level",
                "path": "/approval-level"
            },
            {
                "title": "Permission Access",
                "path": "/permission-access"
            },
            {
                "title": "User Profile",
                "path": "/profile"
            }
        ]
    }
]

export { dashboard, monitoringPoUnit, generalData, application, report, administrator }