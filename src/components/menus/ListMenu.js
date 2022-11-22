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

const generalData = [
    {
        "title": "Common",
        "path": "/common",
        "icon": "bi:grid-3x2-gap-fill"
    },
    {
        "title": "Master Data",
        "path": "/master-data",
        "icon": "bxs:folder-open"
    },
    {
        "title": "Organization",
        "path": "/organization",
        "icon": "clarity:organization-solid"
    },
    {
        "title": "Marketing",
        "path": "/marketing",
        "icon": "fluent-mdl2:market"
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
                        "title": "Contact / Price",
                        "path": "/contact-price"
                    },
                    {
                        "title": "Plan Armada",
                        "path": "/plan-armada"
                    },
                    {
                        "title": "Manifest Data",
                        "path": "/manifest-data"
                    }
                ]
            },
            {
                "title": "Administration",
                "icon": "dashicons:admin-settings",
                "sub": [
                    {
                        "title": "Delivery Order",
                        "path": "/delivery-order"
                    },
                    {
                        "title": "Receipt Update",
                        "path": "/receipt-update"
                    },
                    {
                        "title": "Handover",
                        "path": "/handover"
                    },
                    {
                        "title": "Barcode",
                        "path": "/barcode"
                    }
                ]
            },
            {
                "title": "Operational",
                "icon": "ep:operation",
                "sub": [
                    {
                        "title": "Loading",
                        "path": "/loading"
                    }
                ]
            },
            {
                "title": "Cashier",
                "icon": "mdi:cash-register",
                "path": "/cashier"
            },
            {
                "title": "Billing",
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

export { dashboard, generalData, application, report, administrator }