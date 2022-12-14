import NotFound from "./404"
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Armada from "./generalData/armada/Armada"
import Common from "./generalData/common/Common"
import FinanceAr from "./dashboard/FinanceAr"
import Revenue from "./dashboard/Revenue"
import PlanArmada from "./application/vehicleLogistics/operational/planarmada/PlanArmada"
import Manifest from "./application/vehicleLogistics/administration/manifest/Manifest"
import ManifestCreate from "./application/vehicleLogistics/administration/manifest/ManifestCreate"
import Bast from "./application/vehicleLogistics/administration/bast/Bast"
import BastCreate from "./application/vehicleLogistics/administration/bast/BastCreate"
import POCustomer from "./application/vehicleLogistics/dataGeneral/pocustomer/POCustomer"
import Branch from "./generalData/branch/Branch"
import Customers from "./generalData/customers/Customers"
import Contract from "./application/vehicleLogistics/dataGeneral/contract/Contract"
import PoUnit from "./monitoringPoUnit/PoUnit";

export {
    Dashboard, Armada, Login, FinanceAr, PlanArmada, Common,
    NotFound, Revenue, Manifest, Register, ManifestCreate, Bast, BastCreate,
    POCustomer, Branch, Customers, Contract, PoUnit
}
