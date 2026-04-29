import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Eye,
  FilePlus2,
  Filter,
  HeartPulse,
  Home,
  LayoutGrid,
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

const quickActions = [
  {
    title: "Registrar paciente",
    description: "Cadastre um novo paciente e inicie a anamnese com rapidez.",
    icon: UserPlus,
    cta: "Cadastrar agora",
    featured: true,
  },
  {
    title: "Adicionar profissional",
    description: "Amplie sua equipe com acesso organizado por perfil.",
    icon: Users,
    cta: "Adicionar membro",
  },
  {
    title: "Nova clÃ­nica",
    description: "Cadastre uma nova unidade e centralize o acompanhamento.",
    icon: Building2,
    cta: "Criar clÃ­nica",
  },
];

const stats = [
  { label: "Profissionais", value: "64", change: "+12%", icon: Stethoscope },
  { label: "Pacientes", value: "112", change: "+22%", icon: Users },
  { label: "Clínicas", value: "1", change: "+15%", icon: Building2 },
  { label: "Atendimentos", value: "368", change: "+18%", icon: HeartPulse },
];

const patientRows = [
  {
    initials: "A",
    name: "Adriano Lopes Ferreira",
    id: "ID: 107f6aa5...",
    record: "#25000059",
    birth: "14/05/1976",
    last: "22/04/2026",
    status: "Completa",
    tone: "green",
  },
  {
    initials: "M",
    name: "Maria Aparecida Silva",
    id: "ID: 84b0f...",
    record: "#25000058",
    birth: "03/11/1982",
    last: "20/04/2026",
    status: "Em andamento",
    tone: "amber",
  },
  {
    initials: "J",
    name: "João Carlos Mendes",
    id: "ID: a12c9d...",
    record: "#25000057",
    birth: "22/07/1990",
    last: "18/04/2026",
    status: "Pendente",
    tone: "red",
  },
  {
    initials: "A",
    name: "Ana Paula Santos",
    id: "ID: b2c4de5...",
    record: "#25000056",
    birth: "10/03/1988",
    last: "15/04/2026",
    status: "Completa",
    tone: "green",
  },
  {
    initials: "C",
    name: "Carlos Eduardo Lima",
    id: "ID: c34de5f6...",
    record: "#25000055",
    birth: "28/01/1975",
    last: "10/04/2026",
    status: "Em andamento",
    tone: "amber",
  },
];

const userRows = [
  { initials: "CL", name: "Cecília Lima", email: "cecilia@sisapec.com", role: "Enfermeira", status: "Ativo" },
  { initials: "MS", name: "Mariana Souza", email: "mariana@sisapec.com", role: "Enfermeira", status: "Ativo" },
  { initials: "JM", name: "João Mendes", email: "joao@sisapec.com", role: "Administrador", status: "Ativo" },
  { initials: "LP", name: "Lucas Pereira", email: "lucas@sisapec.com", role: "Técnico", status: "Inativo" },
  { initials: "CR", name: "Carla Ribeiro", email: "carla@sisapec.com", role: "Recepcionista", status: "Ativo" },
];

const gordonSections = [
  "Dados Pessoais",
  "Promoção da Saúde",
  "NutriÃ§Ã£o",
  "EliminaÃ§Ã£o",
  "Atividade e Repouso",
  "PercepÃ§Ã£o e CogniÃ§Ã£o",
  "Auto PercepÃ§Ã£o",
  "Relacionamentos",
  "Sexualidade e Reprodução",
  "Enfrentamento e Tolerância",
  "Valores e CrenÃ§as",
  "SeguranÃ§a e ProteÃ§Ã£o",
  "Conforto",
  "Crescimento e Desenvolvimento",
  "Exames e Resultados",
  "Diagnósticos de Enfermagem",
  "Planejamento Assistencial",
  "EvoluÃ§Ã£o",
];

function SisapecLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo-sisapec.png"
        alt="SisAPEC"
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}

function StatusBadge({ status, tone }: { status: string; tone?: string }) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    red: "bg-rose-50 text-rose-700 border-rose-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  } as const;

  const applied = tone === "green" ? styles.green : tone === "amber" ? styles.amber : tone === "red" ? styles.red : status === "Ativo" ? styles.green : status === "Inativo" ? styles.red : styles.slate;

  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${applied}`}>{status}</span>;
}

function Shell({ active, setActive, children }: { active: string; setActive: (value: string) => void; children: React.ReactNode; }) {
  return <div />;
}

export default function SisapecRedesignDashboard() {
  const [active, setActive] = useState("dashboard");
  return <Shell active={active} setActive={setActive}>preview</Shell>;
}
