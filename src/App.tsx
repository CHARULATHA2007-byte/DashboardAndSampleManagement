import { useState } from "react";
import {
  Eye as EyeIcon,
  EyeOff,
  Lock,
  Mail,
  LayoutDashboard,
  FlaskConical,
  Archive,
  Thermometer,
  ArrowDownToLine,
  GitBranch,
  Bell,
  BarChart3,
  Users,
  Settings,
  Search,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  X,
  MapPin,
  Calendar,
  User,
  Beaker,
  ArrowLeft,
  Activity,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = "dashboard" | "samples" | "sample-detail";
type SampleStatus = "Available" | "Stored" | "Processing" | "Retrieved" | "Expired";

interface Sample {
  id: string;
  type: string;
  collectionDate: string;
  storageLocation: string;
  status: SampleStatus;
  custodian: string;
  quantity: string;
  donor: string;
  receivedDate: string;
  temperature: string;
  freezer: string;
  rack: string;
  box: string;
  position: string;
  department: string;
  notes: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SAMPLES: Sample[] = [
  { id: "BIO-1001", type: "Blood", collectionDate: "2024-09-01", storageLocation: "FZ-01 / R-02 / B-04 / A1", status: "Stored", custodian: "Dr. Sarah Chen", quantity: "5 mL", donor: "D-4821", receivedDate: "2024-09-01", temperature: "-80°C", freezer: "Freezer 01", rack: "Rack 02", box: "Box 04", position: "A1", department: "Hematology", notes: "High-priority donor sample. Handle with care." },
  { id: "BIO-1002", type: "Plasma", collectionDate: "2024-09-03", storageLocation: "FZ-01 / R-03 / B-07 / B2", status: "Available", custodian: "Dr. James Park", quantity: "3 mL", donor: "D-3310", receivedDate: "2024-09-03", temperature: "-80°C", freezer: "Freezer 01", rack: "Rack 03", box: "Box 07", position: "B2", department: "Oncology", notes: "" },
  { id: "BIO-1003", type: "DNA", collectionDate: "2024-08-28", storageLocation: "FZ-02 / R-01 / B-02 / C5", status: "Processing", custodian: "Dr. Maria Santos", quantity: "200 ng/μL", donor: "D-7041", receivedDate: "2024-08-28", temperature: "-20°C", freezer: "Freezer 02", rack: "Rack 01", box: "Box 02", position: "C5", department: "Genomics", notes: "Awaiting sequencing QC." },
  { id: "BIO-1004", type: "Tissue", collectionDate: "2024-08-15", storageLocation: "FZ-03 / R-04 / B-01 / D3", status: "Retrieved", custodian: "Dr. Aaron Liu", quantity: "50 mg", donor: "D-5509", receivedDate: "2024-08-16", temperature: "-196°C", freezer: "Freezer 03", rack: "Rack 04", box: "Box 01", position: "D3", department: "Pathology", notes: "" },
  { id: "BIO-1005", type: "Serum", collectionDate: "2024-07-12", storageLocation: "FZ-02 / R-02 / B-05 / A4", status: "Available", custodian: "Dr. Sarah Chen", quantity: "2 mL", donor: "D-2288", receivedDate: "2024-07-13", temperature: "-80°C", freezer: "Freezer 02", rack: "Rack 02", box: "Box 05", position: "A4", department: "Immunology", notes: "" },
  { id: "BIO-1006", type: "RNA", collectionDate: "2024-06-20", storageLocation: "FZ-01 / R-05 / B-03 / F2", status: "Expired", custodian: "Dr. James Park", quantity: "1 μg", donor: "D-6631", receivedDate: "2024-06-20", temperature: "-80°C", freezer: "Freezer 01", rack: "Rack 05", box: "Box 03", position: "F2", department: "Genomics", notes: "Degraded. Flagged for disposal." },
  { id: "BIO-1007", type: "Urine", collectionDate: "2024-09-05", storageLocation: "FZ-01 / R-01 / B-08 / C3", status: "Stored", custodian: "Dr. Maria Santos", quantity: "10 mL", donor: "D-9012", receivedDate: "2024-09-05", temperature: "-20°C", freezer: "Freezer 01", rack: "Rack 01", box: "Box 08", position: "C3", department: "Nephrology", notes: "" },
  { id: "BIO-1008", type: "Blood", collectionDate: "2024-09-07", storageLocation: "FZ-02 / R-03 / B-06 / B5", status: "Available", custodian: "Dr. Aaron Liu", quantity: "7 mL", donor: "D-1147", receivedDate: "2024-09-07", temperature: "-80°C", freezer: "Freezer 02", rack: "Rack 03", box: "Box 06", position: "B5", department: "Hematology", notes: "" },
];

const lineData = [
  { month: "Apr", samples: 128 }, { month: "May", samples: 145 },
  { month: "Jun", samples: 132 }, { month: "Jul", samples: 168 },
  { month: "Aug", samples: 191 }, { month: "Sep", samples: 214 },
];

const barData = [
  { name: "FZ-01", used: 78, free: 22 },
  { name: "FZ-02", used: 55, free: 45 },
  { name: "FZ-03", used: 91, free: 9 },
  { name: "FZ-04", used: 43, free: 57 },
];

const pieData = [
  { name: "Blood", value: 34 },
  { name: "Plasma", value: 21 },
  { name: "DNA", value: 18 },
  { name: "Tissue", value: 14 },
  { name: "RNA", value: 8 },
  { name: "Other", value: 5 },
];

const PIE_COLORS = ["#0891b2", "#0e7490", "#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"];

const recentActivity = [
  { id: "BIO-1008", action: "Sample received", user: "Dr. Aaron Liu", time: "2 min ago", status: "success" },
  { id: "BIO-1003", action: "Processing started", user: "Dr. Maria Santos", time: "18 min ago", status: "info" },
  { id: "BIO-1007", action: "Sample stored", user: "Dr. Maria Santos", time: "1 hr ago", status: "success" },
  { id: "BIO-1004", action: "Sample retrieved", user: "Dr. Aaron Liu", time: "3 hr ago", status: "warning" },
  { id: "BIO-1006", action: "Sample flagged expired", user: "System", time: "6 hr ago", status: "error" },
];

const timeline = [
  { event: "Sample Collected", user: "Dr. Aaron Liu", date: "2024-08-15", time: "09:14", action: "Collected from donor D-5509", location: "Pathology Lab A", icon: Beaker },
  { event: "Sample Received", user: "Dr. Sarah Chen", date: "2024-08-16", time: "10:32", action: "Received at biobank intake desk", location: "Intake Desk", icon: CheckCircle2 },
  { event: "Sample Stored", user: "Dr. Sarah Chen", date: "2024-08-16", time: "11:05", action: "Stored in primary freezer unit", location: "FZ-03 / R-04 / B-01 / D3", icon: Archive },
  { event: "Sample Transferred", user: "Dr. James Park", date: "2024-08-22", time: "14:20", action: "Transferred to secondary long-term storage", location: "FZ-03 / R-04 / B-01 / D3", icon: GitBranch },
  { event: "Sample Retrieved", user: "Dr. Aaron Liu", date: "2024-09-04", time: "08:47", action: "Retrieved for pathology analysis", location: "Pathology Lab B", icon: ArrowDownToLine },
];

// ─── Helper components ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SampleStatus }) {
  const styles: Record<SampleStatus, string> = {
    Available: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Stored: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",
    Processing: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    Retrieved: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
    Expired: "bg-red-50 text-red-600 ring-1 ring-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "Available" ? "bg-emerald-500" : status === "Stored" ? "bg-cyan-500" : status === "Processing" ? "bg-amber-500" : status === "Retrieved" ? "bg-violet-500" : "bg-red-500"}`} />
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, trend, trendLabel, accent }: {
  icon: React.ElementType; label: string; value: string; trend: "up" | "down" | "neutral"; trendLabel: string; accent: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon size={18} className="text-white" />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-slate-400"}`}>
          {trend === "up" ? <TrendingUp size={13} /> : trend === "down" ? <TrendingDown size={13} /> : null}
          {trendLabel}
        </span>
      </div>
      <div className="text-2xl font-bold text-slate-800 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</div>
      <div className="text-xs text-slate-500 font-medium">{label}</div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "samples", label: "Samples", icon: FlaskConical },
  { id: "storage", label: "Storage", icon: Archive },
  { id: "monitoring", label: "Monitoring", icon: Thermometer },
  { id: "retrieval", label: "Retrieval", icon: ArrowDownToLine },
  { id: "custody", label: "Chain of Custody", icon: GitBranch },
  { id: "alerts", label: "Alerts", icon: Bell, badge: 3 },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  return (
    <aside className="w-60 shrink-0 h-full bg-[#0b1629] flex flex-col select-none">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
            <Beaker size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>BioTrack</div>
            <div className="text-slate-400 text-[10px] mt-0.5">Biobank Management</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-2 mb-2">Navigation</div>
        {navItems.map((item) => {
          const isActive = active === item.id || (active === "sample-detail" && item.id === "samples");
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={16} />
              <span className="flex-1 text-left">{item.label}</span>
              {"badge" in item && item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold">SC</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">Dr. Sarah Chen</div>
            <div className="text-slate-500 text-[10px]">Senior Biobank Staff</div>
          </div>
          <ChevronDown size={13} className="text-slate-500" />
        </div>
      </div>
    </aside>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────

function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="text-slate-800 font-semibold text-base leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>{title}</h1>
        {subtitle && <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search samples, IDs…"
            className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 w-52 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400"
          />
        </div>
        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold">SC</div>
        <span className="text-[10px] font-semibold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-200">Admin</span>
      </div>
    </header>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 xl:grid-cols-6">
          <StatCard icon={FlaskConical} label="Total Samples" value="12,847" trend="up" trendLabel="+4.2%" accent="bg-cyan-500" />
          <StatCard icon={CheckCircle2} label="Available" value="8,214" trend="up" trendLabel="+1.8%" accent="bg-emerald-500" />
          <StatCard icon={Archive} label="In Storage" value="3,902" trend="neutral" trendLabel="Stable" accent="bg-slate-500" />
          <StatCard icon={Clock} label="Pending Retrieval" value="31" trend="down" trendLabel="-12%" accent="bg-amber-500" />
          <StatCard icon={BarChart3} label="Storage Capacity" value="74%" trend="up" trendLabel="+3%" accent="bg-violet-500" />
          <StatCard icon={AlertTriangle} label="Active Alerts" value="3" trend="up" trendLabel="+2" accent="bg-red-500" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-12 gap-4">
          {/* Line chart */}
          <div className="col-span-5 bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>Collection Trend</h3>
                <p className="text-xs text-slate-400 mt-0.5">Samples collected per month</p>
              </div>
              <Activity size={14} className="text-slate-300" />
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="samples" stroke="#0891b2" strokeWidth={2.5} dot={{ r: 3, fill: "#0891b2" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="col-span-3 bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sample Distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">By type</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <span className="w-2 h-2 rounded-sm" style={{ background: PIE_COLORS[i] }} />
                  {d.name}
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="col-span-4 bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>Storage Utilization</h3>
              <p className="text-xs text-slate-400 mt-0.5">% used per freezer</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={barData} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="used" fill="#0891b2" radius={[3, 3, 0, 0]} name="Used" />
                <Bar dataKey="free" fill="#e0f7fb" radius={[3, 3, 0, 0]} name="Free" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity + Alerts */}
        <div className="grid grid-cols-12 gap-4">
          {/* Recent Activity */}
          <div className="col-span-8 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <h3 className="text-sm font-semibold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>Recent Activity</h3>
              <button onClick={() => onNavigate("samples")} className="text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
                View all <ChevronRight size={13} />
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {recentActivity.map((row) => (
                <div key={row.id + row.time} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50/60 transition-colors">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    row.status === "success" ? "bg-emerald-50" : row.status === "error" ? "bg-red-50" : row.status === "warning" ? "bg-amber-50" : "bg-cyan-50"
                  }`}>
                    {row.status === "success" ? <CheckCircle2 size={13} className="text-emerald-600" /> :
                      row.status === "error" ? <X size={13} className="text-red-500" /> :
                      row.status === "warning" ? <AlertTriangle size={13} className="text-amber-500" /> :
                      <Activity size={13} className="text-cyan-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-cyan-700">{row.id}</span>
                      <span className="text-xs text-slate-600">{row.action}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{row.user}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{row.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="col-span-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-50">
              <h3 className="text-sm font-semibold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>Active Alerts</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-red-700">Temperature Warning</div>
                  <div className="text-[10px] text-red-500 mt-0.5">Freezer 03 at −197.4°C — above threshold</div>
                  <div className="text-[10px] text-slate-400 mt-1">Today, 07:42</div>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
                <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-amber-700">Storage Nearly Full</div>
                  <div className="text-[10px] text-amber-600 mt-0.5">Freezer 03 capacity at 91%</div>
                  <div className="text-[10px] text-slate-400 mt-1">Today, 06:15</div>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                <Clock size={14} className="text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-orange-700">Sample Expiry</div>
                  <div className="text-[10px] text-orange-600 mt-0.5">BIO-1012, BIO-1019 expire in 7 days</div>
                  <div className="text-[10px] text-slate-400 mt-1">Yesterday, 23:59</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sample Management ────────────────────────────────────────────────────────

function SampleManagement({ onViewSample }: { onViewSample: (s: Sample) => void }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<SampleStatus | "All">("All");

  const filtered = SAMPLES.filter((s) => {
    const q = search.toLowerCase();
    const matchQ = s.id.toLowerCase().includes(q) || s.type.toLowerCase().includes(q) || s.custodian.toLowerCase().includes(q);
    const matchF = filterStatus === "All" || s.status === filterStatus;
    return matchQ && matchF;
  });

  const statuses: (SampleStatus | "All")[] = ["All", "Available", "Stored", "Processing", "Retrieved", "Expired"];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sample Inventory</h2>
            <p className="text-xs text-slate-400 mt-0.5">{filtered.length} records</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Download size={13} /> Export
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors">
              <Plus size={13} /> Add Sample
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, type, custodian…"
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400"
            />
          </div>
          <div className="flex gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${filterStatus === s ? "bg-cyan-600 text-white" : "text-slate-500 hover:text-slate-700"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={13} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Sample ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Collection Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Storage Location</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Custodian</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-sm text-slate-400">No samples match your search.</td>
                </tr>
              )}
              {filtered.map((sample) => (
                <tr key={sample.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs font-semibold text-cyan-700">{sample.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-cyan-50 flex items-center justify-center">
                        <Beaker size={11} className="text-cyan-600" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{sample.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Calendar size={11} className="text-slate-400" />
                      {sample.collectionDate}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin size={11} className="text-slate-400" />
                      {sample.storageLocation}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={sample.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center text-white text-[9px] font-bold">
                        {sample.custodian.split(" ").map((n) => n[0]).slice(1, 3).join("")}
                      </div>
                      <span className="text-xs text-slate-600">{sample.custodian}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onViewSample(sample)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                        title="View Details"
                      >
                        <Eye size={13} />
                      </button>
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                        <MoreHorizontal size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-50">
            <span className="text-[10px] text-slate-400">Showing {filtered.length} of {SAMPLES.length} samples</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-cyan-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sample Details ───────────────────────────────────────────────────────────

function SampleDetail({ sample, onBack }: { sample: Sample; onBack: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="p-6">
        {/* Back + header */}
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 mb-4 transition-colors">
          <ArrowLeft size={13} /> Back to Sample Management
        </button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>{sample.id}</h2>
              <StatusBadge status={sample.status} />
            </div>
            <p className="text-xs text-slate-400">{sample.type} · Donor {sample.donor} · {sample.department}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              <Download size={13} /> Export
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700">
              <ArrowDownToLine size={13} /> Request Retrieval
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* Left column */}
          <div className="col-span-8 space-y-5">
            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Sample Info */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Beaker size={13} className="text-cyan-600" /> Sample Information
                </h3>
                <dl className="space-y-3">
                  {[
                    ["Sample ID", sample.id],
                    ["Type", sample.type],
                    ["Status", <StatusBadge key="s" status={sample.status} />],
                    ["Collection Date", sample.collectionDate],
                    ["Received Date", sample.receivedDate],
                    ["Quantity / Volume", sample.quantity],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex justify-between items-center">
                      <dt className="text-[11px] text-slate-400">{label}</dt>
                      <dd className={`text-xs font-medium text-slate-700 ${label === "Sample ID" ? "font-mono text-cyan-700" : ""}`}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Storage Info */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Archive size={13} className="text-cyan-600" /> Storage Information
                </h3>
                <dl className="space-y-3">
                  {[
                    ["Freezer", sample.freezer],
                    ["Rack", sample.rack],
                    ["Box", sample.box],
                    ["Position", sample.position],
                    ["Temperature", sample.temperature],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex justify-between items-center">
                      <dt className="text-[11px] text-slate-400">{label}</dt>
                      <dd className="text-xs font-medium text-slate-700">{value}</dd>
                    </div>
                  ))}
                </dl>
                {/* Visual path */}
                <div className="mt-4 pt-4 border-t border-slate-50">
                  <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-wider font-semibold">Location Path</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {[sample.freezer, sample.rack, sample.box, sample.position].map((loc, i, arr) => (
                      <span key={loc} className="flex items-center gap-1">
                        <span className="bg-cyan-50 text-cyan-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-cyan-100">{loc}</span>
                        {i < arr.length - 1 && <ChevronRight size={11} className="text-slate-300" />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
                <GitBranch size={13} className="text-cyan-600" /> Sample History Timeline
              </h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100" />
                <div className="space-y-6">
                  {timeline.map((evt, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        i === timeline.length - 1 ? "bg-cyan-600 ring-4 ring-cyan-100" : "bg-white border-2 border-slate-200"
                      }`}>
                        <evt.icon size={13} className={i === timeline.length - 1 ? "text-white" : "text-slate-400"} />
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-xs font-semibold text-slate-800">{evt.event}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{evt.action}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] font-medium text-slate-600">{evt.date}</div>
                            <div className="text-[10px] text-slate-400">{evt.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <User size={10} /> {evt.user}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <MapPin size={10} /> {evt.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-4 space-y-4">
            {/* Custodian */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User size={13} className="text-cyan-600" /> Current Custodian
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                  {sample.custodian.split(" ").map((n) => n[0]).slice(1, 3).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{sample.custodian}</div>
                  <div className="text-[10px] text-slate-400">{sample.department}</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
                Assigned since {sample.receivedDate}
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-4">Quick Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
                  <Thermometer size={14} className="text-cyan-600" />
                  <div>
                    <div className="text-[10px] text-slate-400">Storage Temp</div>
                    <div className="text-xs font-semibold text-slate-700">{sample.temperature}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
                  <FlaskConical size={14} className="text-cyan-600" />
                  <div>
                    <div className="text-[10px] text-slate-400">Quantity</div>
                    <div className="text-xs font-semibold text-slate-700">{sample.quantity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
                  <Archive size={14} className="text-cyan-600" />
                  <div>
                    <div className="text-[10px] text-slate-400">Department</div>
                    <div className="text-xs font-semibold text-slate-700">{sample.department}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {sample.notes && (
              <div className="bg-amber-50 rounded-xl border border-amber-100 p-4">
                <div className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider mb-1">Notes</div>
                <p className="text-xs text-amber-700">{sample.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Login ───────────────────────────────────────────────────────────────────

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("sarah.chen@biotrack.org");
  const [password, setPassword] = useState("••••••••••");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  }

  return (
    <div className="h-full flex overflow-hidden bg-[#0b1629]">
      {/* Left panel — branding + visual */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] relative p-12 overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1629] via-[#0c2240] to-[#083344]" />
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-teal-400/8 blur-3xl" />
        {/* Grid dots */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Beaker size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>BioTrack</div>
            <div className="text-slate-400 text-xs mt-0.5">Biobank Management System</div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative">
          {/* Abstract freezer grid illustration */}
          <div className="mb-10">
            <div className="grid grid-cols-8 gap-1.5 mb-6 opacity-60">
              {Array.from({ length: 64 }).map((_, i) => {
                const filled = [2,3,5,8,9,10,12,17,18,19,21,26,27,29,33,34,37,42,43,45,50,51,53,58,59,61].includes(i);
                const reserved = [6,15,22,38,46,55].includes(i);
                return (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-md border transition-colors ${
                      filled ? "bg-cyan-500/70 border-cyan-400/40" :
                      reserved ? "bg-amber-500/40 border-amber-400/30" :
                      "bg-white/4 border-white/8"
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-cyan-500/70" />Occupied</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500/40" />Reserved</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-white/10" />Available</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white leading-snug mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Track. Store.<br />Retrieve. Secure.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            A complete digital platform for managing biological samples — from collection to chain-of-custody, with real-time storage monitoring and full audit trails.
          </p>

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[["12,847", "Samples tracked"], ["99.97%", "Uptime SLA"], ["4 sites", "Connected labs"]].map(([val, label]) => (
              <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-4">
                <div className="text-cyan-400 font-bold text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>{val}</div>
                <div className="text-slate-500 text-[10px] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative text-[11px] text-slate-600 leading-relaxed">
          ISO 20387 compliant · GDPR secure · 21 CFR Part 11 audit trail
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 relative">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
              <Beaker size={15} className="text-white" />
            </div>
            <span className="font-bold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>BioTrack</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Welcome back</h1>
          <p className="text-slate-400 text-sm mb-8">Sign in to your BioTrack account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all"
                  placeholder="you@biotrack.org"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-600">Password</label>
                <button type="button" className="text-xs text-cyan-600 hover:text-cyan-700 font-medium">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={14} /> : <EyeIcon size={14} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${remember ? "bg-cyan-600 border-cyan-600" : "border-slate-300 bg-white"}`}
              >
                {remember && <CheckCircle2 size={10} className="text-white" />}
              </button>
              <span className="text-xs text-slate-500">Remember me for 30 days</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 active:scale-[0.99] transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2 shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : null}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* SSO */}
          <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2.5">
            <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">G</span>
            </div>
            Sign in with SSO
          </button>

          <p className="text-center text-[10px] text-slate-400 mt-8">
            BioTrack v3.2.1 · ISO 20387 certified · <span className="text-cyan-600">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [navId, setNavId] = useState("dashboard");

  function handleNav(id: string) {
    setNavId(id);
    if (id === "dashboard") setScreen("dashboard");
    else if (id === "samples") setScreen("samples");
    else setScreen("dashboard");
  }

  function handleViewSample(sample: Sample) {
    setSelectedSample(sample);
    setScreen("sample-detail");
  }

  function handleBack() {
    setScreen("samples");
    setSelectedSample(null);
  }

  const topbarTitles: Record<Screen, { title: string; subtitle?: string }> = {
    dashboard: { title: "Dashboard", subtitle: "BioTrack Overview — September 2024" },
    samples: { title: "Sample Management", subtitle: "Inventory, search and manage biological samples" },
    "sample-detail": { title: `Sample ${selectedSample?.id ?? ""}`, subtitle: `${selectedSample?.type} · ${selectedSample?.department}` },
  };

  const bar = topbarTitles[screen];

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden">
      <Sidebar active={navId} onNavigate={handleNav} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar title={bar.title} subtitle={bar.subtitle} />
        {screen === "dashboard" && <Dashboard onNavigate={(s) => { setScreen(s); setNavId(s); }} />}
        {screen === "samples" && <SampleManagement onViewSample={handleViewSample} />}
        {screen === "sample-detail" && selectedSample && <SampleDetail sample={selectedSample} onBack={handleBack} />}
      </div>
    </div>
  );
}
