import React, { useState } from "react";
import {
  Bell,
  Building2,
  CalendarDays,
  CircleUserRound,
  ClipboardList,
  Eye,
  FilePlus2,
  HeartPulse,
  Home,
  MapPin,
  Menu,
  MoreVertical,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const navItems = [
  { id: "dashboard", label: "Início", icon: Home },
  { id: "patients", label: "Pacientes", icon: Users },
  { id: "anamnesis", label: "Anamnese", icon: ClipboardList },
  { id: "users", label: "Usuários", icon: UserCog },
  { id: "register", label: "Cadastro", icon: FilePlus2 },
  { id: "settings", label: "Configurações", icon: Settings },
];

const patientRows = [
  { initials: "A", name: "Adriano Lopes Ferreira", id: "ID: 107f6aa5", record: "#25000059", birth: "14/05/1976", last: "22/04/2026", status: "Completa", tone: "green" },
  { initials: "M", name: "Maria Aparecida Silva", id: "ID: 84b0f", record: "#25000058", birth: "03/11/1982", last: "20/04/2026", status: "Em andamento", tone: "amber" },
  { initials: "J", name: "João Carlos Mendes", id: "ID: a12c9d", record: "#25000057", birth: "22/07/1990", last: "18/04/2026", status: "Pendente", tone: "red" },
  { initials: "A", name: "Ana Paula Santos", id: "ID: b2c4de5", record: "#25000056", birth: "10/03/1988", last: "15/04/2026", status: "Completa", tone: "green" },
];

const userRows = [
  { initials: "CL", name: "Cecília Lima", email: "cecilia@sisapec.com", role: "Enfermeira", status: "Ativo" },
  { initials: "MS", name: "Mariana Souza", email: "mariana@sisapec.com", role: "Enfermeira", status: "Ativo" },
  { initials: "JM", name: "João Mendes", email: "joao@sisapec.com", role: "Administrador", status: "Ativo" },
  { initials: "LP", name: "Lucas Pereira", email: "lucas@sisapec.com", role: "Técnico", status: "Inativo" },
];

const anamnesisSections = [
  "Dados Pessoais",
  "Promoção da Saúde",
  "Nutrição",
  "Eliminação",
  "Atividade e Repouso",
  "Percepção e Cognição",
  "Auto Percepção",
  "Relacionamentos",
  "Sexualidade e Reprodução",
  "Enfrentamento e Tolerância",
  "Valores e Crenças",
  "Segurança e Proteção",
  "Conforto",
  "Crescimento e Desenvolvimento",
  "Exames e Resultados",
  "Diagnósticos de Enfermagem",
  "Planejamento Assistencial",
  "Evolução",
];

type Screen = "dashboard" | "patients" | "anamnesis" | "users" | "register" | "settings";

type SetActive = (value: Screen) => void;

function SisapecLogo() {
  return (
    <div className="flex items-center gap-3">
      <img src="/logo-sisapec.png" alt="SisAPEC" className="h-12 w-auto object-contain" />
      <div className="hidden sm:block">
        <div className="text-xl font-semibold tracking-tight text-slate-800">SisAPEC</div>
        <div className="text-[10px] uppercase tracking-wide text-slate-400">Processo de enfermagem</div>
      </div>
    </div>
  );
}

function StatusBadge({ status, tone }: { status: string; tone?: string }) {
  const color = tone === "green" || status === "Ativo" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : tone === "amber" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-rose-50 text-rose-700 border-rose-100";
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${color}`}>{status}</span>;
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-slate-800">{label}:</div>
      <div className="mt-1 text-sm text-slate-600">{value}</div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, error }: { label: string; placeholder: string; value?: string; onChange?: (value: string) => void; error?: boolean }) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-medium text-slate-700">{label}</Label>
      <Input value={value} onChange={(e) => onChange?.(e.target.value)} className={`h-11 rounded-xl bg-slate-50 ${error ? "border-rose-300" : "border-slate-200"}`} placeholder={placeholder} />
    </div>
  );
}

function Shell({ active, setActive, children }: { active: Screen; setActive: SetActive; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fbfc_0%,#f3f8fb_100%)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-cyan-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <SisapecLogo />
          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActive(item.id as Screen)} className={`relative pb-1 text-sm font-semibold transition ${active === item.id ? "text-cyan-600" : "text-slate-600 hover:text-slate-900"}`}>
                {item.label}
                {active === item.id && <span className="absolute -bottom-[18px] left-0 h-[3px] w-full rounded-full bg-cyan-500" />}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="hidden rounded-xl border-cyan-100 bg-white lg:inline-flex"><Bell className="h-4 w-4" /></Button>
            <Avatar className="h-11 w-11"><AvatarFallback className="bg-gradient-to-br from-cyan-500 to-sky-600 text-white">CL</AvatarFallback></Avatar>
            <Button variant="outline" size="icon" className="rounded-xl border-cyan-100 bg-white lg:hidden"><Menu className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden lg:block">
          <Card className="rounded-[28px] border-cyan-100 bg-white/95 shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => setActive(item.id as Screen)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${active === item.id ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:bg-slate-50"}`}>
                      <Icon className="h-4 w-4" />{item.label}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}

function DashboardScreen({ setActive }: { setActive: SetActive }) {
  const cards = [
    { title: "Registrar paciente", desc: "Cadastre um novo paciente e inicie a anamnese.", icon: UserPlus, action: () => setActive("patients"), primary: true },
    { title: "Adicionar profissional", desc: "Crie acessos para a equipe.", icon: Users, action: () => setActive("register") },
    { title: "Ver usuários", desc: "Gerencie perfis e permissões.", icon: UserCog, action: () => setActive("users") },
  ];
  return (
    <div className="space-y-8">
      <Card className="rounded-[30px] border-cyan-100 bg-[linear-gradient(135deg,#ffffff_0%,#f4fcfb_55%,#eef8ff_100%)] shadow-sm">
        <CardContent className="p-8">
          <Badge className="rounded-full bg-white text-cyan-700 shadow-sm hover:bg-white">Painel assistencial</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Bem-vinda, <span className="text-cyan-600">Enf. Cecília!</span></h1>
          <p className="mt-4 max-w-2xl text-slate-600">Gerencie pacientes, anamneses e indicadores da clínica com uma experiência mais humana e intuitiva.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => setActive("patients")} className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-5 text-white"><Plus className="mr-2 h-4 w-4" />Registrar paciente</Button><Button onClick={() => setActive("anamnesis")} variant="outline" className="h-12 rounded-2xl border-cyan-100 bg-white px-5">Abrir anamnese</Button></div>
        </CardContent>
      </Card>
      <div className="grid gap-4 xl:grid-cols-4">
        {[{label:"Profissionais",value:"64",icon:Stethoscope},{label:"Pacientes",value:"112",icon:Users},{label:"Clínicas",value:"1",icon:Building2},{label:"Atendimentos",value:"368",icon:HeartPulse}].map((stat)=>{const Icon=stat.icon;return <Card key={stat.label} className="rounded-[24px] border-cyan-100 bg-white shadow-sm"><CardContent className="flex items-center gap-4 p-5"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700"><Icon className="h-5 w-5" /></div><div><div className="text-sm text-slate-500">{stat.label}</div><div className="text-3xl font-semibold">{stat.value}</div></div></CardContent></Card>})}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {cards.map((card)=>{const Icon=card.icon;return <Card key={card.title} onClick={card.action} className={`cursor-pointer rounded-[28px] border transition hover:-translate-y-1 hover:shadow-lg ${card.primary ? "border-cyan-200 bg-gradient-to-br from-cyan-500 to-sky-600 text-white" : "border-cyan-100 bg-white"}`}><CardContent className="p-6"><div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.primary ? "bg-white/15" : "bg-cyan-50 text-cyan-700"}`}><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-semibold">{card.title}</h3><p className={`mt-3 text-sm ${card.primary ? "text-cyan-50" : "text-slate-600"}`}>{card.desc}</p></CardContent></Card>})}
      </div>
    </div>
  );
}

function PatientsScreen({ setActive }: { setActive: SetActive }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Todos");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const filtered = patientRows.filter((row) => `${row.name} ${row.record} ${row.status}`.toLowerCase().includes(query.toLowerCase()) && (status === "Todos" || row.status === status));
  return (
    <div className="space-y-6">
      <HeaderCard icon={Users} title="Pacientes" text="Acesse e gerencie todos os pacientes cadastrados no sistema." action={<Button onClick={() => setActive("anamnesis")} className="h-12 rounded-2xl bg-sky-900 px-6 text-white"><Plus className="mr-2 h-4 w-4" />Novo Paciente</Button>} />
      <Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardContent className="flex flex-col gap-3 p-6 xl:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={query} onChange={(e) => setQuery(e.target.value)} className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11" placeholder="Pesquisar por prontuário, paciente ou status..." /></div><select value={status} onChange={(e)=>setStatus(e.target.value)} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm"><option>Todos</option><option>Completa</option><option>Em andamento</option><option>Pendente</option></select><Button onClick={()=>{setQuery("");setStatus("Todos");}} className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 text-white">Limpar</Button></CardContent></Card>
      <Card className="overflow-hidden rounded-[26px] border-cyan-100 bg-white shadow-sm"><div className="overflow-x-auto"><table className="min-w-full text-left"><thead className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white"><tr className="text-sm"><th className="px-6 py-4">Paciente</th><th className="px-4 py-4">Prontuário</th><th className="px-4 py-4">Data Nasc.</th><th className="px-4 py-4">Última Anamnese</th><th className="px-4 py-4">Status</th><th className="px-4 py-4">Ações</th></tr></thead><tbody>{filtered.map((row)=><tr key={row.record} className="border-b border-slate-100 hover:bg-slate-50"><td className="px-6 py-4"><div className="flex items-center gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 font-semibold text-cyan-700">{row.initials}</div><div><div className="font-medium">{row.name}</div><div className="text-xs text-slate-400">{row.id}</div></div></div></td><td className="px-4 py-4"><Badge className="bg-cyan-50 text-cyan-700">{row.record}</Badge></td><td className="px-4 py-4 text-sm text-slate-600">{row.birth}</td><td className="px-4 py-4 text-sm text-slate-600">{row.last}</td><td className="px-4 py-4"><StatusBadge status={row.status} tone={row.tone} /></td><td className="relative px-4 py-4"><Button variant="ghost" size="icon" onClick={() => setActive("anamnesis")}><Eye className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => setOpenMenu(openMenu === row.record ? null : row.record)}><MoreVertical className="h-4 w-4" /></Button>{openMenu === row.record && <div className="absolute right-4 top-12 z-10 w-44 rounded-2xl border bg-white p-2 shadow-xl"><button onClick={()=>setActive("anamnesis")} className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-cyan-50">Ver anamnese</button><button className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-cyan-50">Editar paciente</button><button className="w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">Excluir</button></div>}</td></tr>)}{filtered.length===0&&<tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Nenhum paciente encontrado.</td></tr>}</tbody></table></div></Card>
    </div>
  );
}

function AnamnesisScreen({ setActive }: { setActive: SetActive }) {
  const [index, setIndex] = useState(0);
  const section = anamnesisSections[index];
  const progress = Math.round(((index + 1) / anamnesisSections.length) * 100);
  return (
    <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <HeaderCard icon={ClipboardList} title={`Anamnese | ${section}`} text="Paciente: Adriano Lopes Ferreira · Anamnese de 22/04/2026" />
        <Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardContent className="p-6"><div className="mb-2 flex justify-between text-sm text-slate-500"><span>Progresso da anamnese</span><span>{progress}%</span></div><div className="h-3 overflow-hidden rounded-full bg-cyan-50"><div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all" style={{width:`${progress}%`}} /></div></CardContent></Card>
        {section === "Dados Pessoais" ? <><DataCard title="Anamnese do Paciente" icon={ClipboardList}><div className="grid gap-6 md:grid-cols-3"><Info label="Nome" value="Adriano Lopes Ferreira" /><Info label="Prontuário" value="25000059" /><Info label="Ocupação" value="Empresário(a) / Empregador(a)" /><Info label="Data de Nascimento" value="14/05/1976" /><Info label="Estado Civil" value="Casado(a)" /><Info label="Educação" value="Ensino Fundamental Completo" /><Info label="Idade" value="49 anos" /><Info label="Etnia" value="Parda" /><Info label="Sexo" value="Masculino" /></div></DataCard><DataCard title="Endereço" icon={MapPin}><div className="grid gap-6 md:grid-cols-3"><Info label="Endereço" value="Rua Ribeirão Preto" /><Info label="Número" value="89" /><Info label="Bairro" value="Chácara São João" /><Info label="Cidade" value="Amparo, SP" /></div></DataCard></> : <Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardHeader><CardTitle>{section}</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm leading-7 text-slate-600">Conteúdo interativo simulado desta seção da anamnese. Aqui entram perguntas, achados clínicos, observações e registros de enfermagem.</p><div className="grid gap-4 md:grid-cols-2"><Field label="Achados principais" placeholder="Digite os achados clínicos" /><Field label="Observações" placeholder="Digite observações relevantes" /></div><textarea className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-cyan-400" placeholder="Evolução, necessidades identificadas e condutas..." /></CardContent></Card>}
        <div className="flex flex-wrap justify-end gap-3"><Button variant="outline" onClick={()=>setActive("patients")} className="h-12 rounded-2xl bg-white px-6">Voltar</Button><Button variant="outline" disabled={index===0} onClick={()=>setIndex(Math.max(0,index-1))} className="h-12 rounded-2xl bg-white px-6">Anterior</Button><Button onClick={()=>setIndex(Math.min(anamnesisSections.length-1,index+1))} className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 text-white"><Save className="mr-2 h-4 w-4" />Salvar e Continuar</Button></div>
      </div>
      <Card className="h-fit rounded-[26px] border-cyan-100 bg-white shadow-sm 2xl:sticky 2xl:top-28"><CardContent className="p-5"><div className="mb-5"><div className="text-lg font-semibold text-cyan-700">ANAMNESE</div><div className="text-sm text-slate-500">{anamnesisSections.length} seções</div></div><div className="max-h-[680px] space-y-2 overflow-auto pr-1">{anamnesisSections.map((item,i)=><button key={item} onClick={()=>setIndex(i)} className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm ${index===i?"border-cyan-200 bg-cyan-50 text-cyan-700":"border-transparent text-slate-600 hover:bg-slate-50"}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${index===i?"bg-cyan-500 text-white":"bg-slate-100 text-slate-500"}`}>{i+1}</span>{item}</button>)}</div></CardContent></Card>
    </div>
  );
}

function UsersScreen({ setActive }: { setActive: SetActive }) {
  const [query, setQuery] = useState("");
  const filtered = userRows.filter((user) => `${user.name} ${user.email} ${user.role} ${user.status}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6"><HeaderCard icon={UserCog} title="Usuários" text="Gerencie os usuários e permissões de acesso do sistema." action={<Button onClick={()=>setActive("register")} className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 text-white"><Plus className="mr-2 h-4 w-4" />Novo Usuário</Button>} /><Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardContent className="relative p-6"><Search className="absolute left-10 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={query} onChange={(e)=>setQuery(e.target.value)} className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11" placeholder="Buscar por nome, e-mail ou perfil..." /></CardContent></Card><Card className="overflow-hidden rounded-[26px] border-cyan-100 bg-white shadow-sm"><table className="min-w-full text-left"><thead className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white"><tr><th className="px-6 py-4">Usuário</th><th className="px-4 py-4">E-mail</th><th className="px-4 py-4">Perfil</th><th className="px-4 py-4">Status</th><th className="px-4 py-4">Ações</th></tr></thead><tbody>{filtered.map((user)=><tr key={user.email} className="border-b border-slate-100 hover:bg-slate-50"><td className="px-6 py-4"><div className="flex items-center gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 font-semibold text-cyan-700">{user.initials}</div>{user.name}</div></td><td className="px-4 py-4 text-sm text-slate-600">{user.email}</td><td className="px-4 py-4 text-sm text-slate-600">{user.role}</td><td className="px-4 py-4"><StatusBadge status={user.status} /></td><td className="px-4 py-4"><Button variant="ghost" size="icon" onClick={()=>setActive("register")}><Eye className="h-4 w-4" /></Button></td></tr>)}{filtered.length===0&&<tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Nenhum usuário encontrado.</td></tr>}</tbody></table></Card></div>;
}

function RegisterScreen({ setActive }: { setActive: SetActive }) {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const hasError = saved && (!name || !email);
  return <div className="space-y-6"><HeaderCard icon={FilePlus2} title="Cadastro de Usuário" text="Preencha os dados para criar um novo usuário no sistema." />{saved&&!hasError&&<div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">Usuário salvo com sucesso!</div>}{hasError&&<div className="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">Preencha nome completo e e-mail.</div>}<Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardContent className="p-6"><div className="mb-5 text-lg font-semibold">Dados Pessoais</div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><Field label="Nome Completo *" placeholder="Digite o nome completo" value={name} onChange={setName} error={hasError&&!name} /><Field label="E-mail *" placeholder="exemplo@email.com" value={email} onChange={setEmail} error={hasError&&!email} /><Field label="Telefone" placeholder="(11) 99999-9999" /><Field label="CPF" placeholder="000.000.000-00" /><Field label="Data de Nascimento" placeholder="dd/mm/aaaa" /></div></CardContent></Card><Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardContent className="p-6"><div className="mb-5 text-lg font-semibold">Acesso</div><div className="grid gap-4 md:grid-cols-3"><Field label="Perfil" placeholder="Selecione o perfil" /><Field label="Senha" placeholder="Digite a senha" /><Field label="Confirmar Senha" placeholder="Confirme a senha" /></div></CardContent></Card><Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardContent className="p-6"><div className="mb-4 text-lg font-semibold">Status</div><div className="flex items-center space-x-3"><Switch defaultChecked /><Label>Ativo</Label></div></CardContent></Card><div className="flex justify-end gap-3"><Button variant="outline" onClick={()=>setActive("users")} className="h-12 rounded-2xl bg-white px-6">Cancelar</Button><Button onClick={()=>setSaved(true)} className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 text-white"><Save className="mr-2 h-4 w-4" />Salvar Usuário</Button></div></div>;
}

function SettingsScreen() {
  return <div className="space-y-6"><HeaderCard icon={Settings} title="Configurações" text="Ajustes gerais do sistema, notificações e preferências assistenciais." /><div className="grid gap-6 xl:grid-cols-2"><Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardContent className="space-y-5 p-6"><div className="flex items-center gap-3"><Bell className="h-5 w-5 text-cyan-600" /><div className="text-lg font-semibold">Notificações</div></div><div className="flex items-center justify-between rounded-2xl border p-4"><div><div className="font-medium">Lembretes de retorno</div><div className="text-sm text-slate-500">Receber alertas de pacientes com retorno.</div></div><Switch defaultChecked /></div><div className="flex items-center justify-between rounded-2xl border p-4"><div><div className="font-medium">Pendências de anamnese</div><div className="text-sm text-slate-500">Exibir registros incompletos.</div></div><Switch defaultChecked /></div></CardContent></Card><Card className="rounded-[26px] border-cyan-100 bg-white shadow-sm"><CardContent className="space-y-5 p-6"><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-cyan-600" /><div className="text-lg font-semibold">Acesso e segurança</div></div><div className="rounded-2xl border p-4"><div className="font-medium">Perfil atual</div><div className="text-sm text-slate-500">Administrador clínico com permissões ampliadas.</div></div></CardContent></Card></div></div>;
}

function HeaderCard({ icon: Icon, title, text, action }: { icon: React.ElementType; title: string; text: string; action?: React.ReactNode }) {
  return <Card className="rounded-[30px] border-cyan-100 bg-[linear-gradient(135deg,#ffffff_0%,#f4fcfb_58%,#eef8ff_100%)] shadow-sm"><CardContent className="flex flex-col gap-6 p-8 xl:flex-row xl:items-center xl:justify-between"><div><div className="flex items-center gap-3 text-cyan-600"><Icon className="h-7 w-7" /><h1 className="text-4xl font-semibold tracking-tight text-slate-900">{title}</h1></div><p className="mt-3 text-base text-slate-600">{text}</p></div>{action}</CardContent></Card>;
}

function DataCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return <Card className="overflow-hidden rounded-[26px] border-cyan-100 bg-white shadow-sm"><div className="bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-4 text-white"><div className="flex items-center justify-center gap-2 text-lg font-semibold"><Icon className="h-5 w-5" />{title}</div></div><CardContent className="p-6">{children}</CardContent></Card>;
}

export default function SisapecRedesignDashboard() {
  const [active, setActive] = useState<Screen>("dashboard");
  const screen = active === "dashboard" ? <DashboardScreen setActive={setActive} /> : active === "patients" ? <PatientsScreen setActive={setActive} /> : active === "anamnesis" ? <AnamnesisScreen setActive={setActive} /> : active === "users" ? <UsersScreen setActive={setActive} /> : active === "register" ? <RegisterScreen setActive={setActive} /> : <SettingsScreen />;
  return <Shell active={active} setActive={setActive}>{screen}</Shell>;
}
