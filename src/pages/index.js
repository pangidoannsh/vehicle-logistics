import NotFound from "./404"
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Armada from "./generalData/armada/Armada"
import Common from "./generalData/common/Common"
import FinanceAr from "./dashboard/FinanceAr"
import Revenue from "./dashboard/Revenue"
import PlanArmada from "./application/operational/planarmada/PlanArmada"
import Manifest from "./application/operational/manifest/Manifest"
import ManifestCreate from "./application/operational/manifest/ManifestCreate"
import Bast from "./application/operational/bast/Bast"
import BastCreate from "./application/operational/bast/BastCreate"
import POCustomer from "./application/dataGeneral/pocustomer/POCustomer"
import Branch from "./generalData/branch/Branch"
import Customers from "./generalData/customers/Customers"
import Contract from "./application/dataGeneral/contract/Contract"
import PoUnit from "./monitoringPoUnit/PoUnit";
import TransitOut from "./application/operational/transitOut/TransitOut";

export {
    Dashboard, Armada, Login, FinanceAr, PlanArmada, Common,
    NotFound, Revenue, Manifest, Register, ManifestCreate, Bast, BastCreate,
    POCustomer, Branch, Customers, Contract, PoUnit, TransitOut
};
