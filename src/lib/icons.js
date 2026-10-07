import {
  AlertCircle,
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Compass,
  Construction,
ExternalLink,
Facebook,
Factory,
  FileText,
  Forklift,
  Gauge,
  HardHat,
  Headset,
  IndianRupee,
Info,
Instagram,
Layers,
  Mail,
  MapPin,
  MapPinned,
  Menu,
  MessageCircle,
  MoveRight,
  MoveUpRight,
  Navigation,
  Package,
  Phone,
  PhoneCall,
  Quote,
  Route,
  Ruler,
  Send,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Star,
  Timer,
  Truck,
  Warehouse,
  Weight,
  Wrench,
X,
Youtube,
Zap,
} from 'lucide-react'

/**
 * Maps the icon *names* used inside BUSINESS_CONFIG to Lucide components.
 * Keeping this as plain data lets the central config file stay free of JSX
 * while a single `icon` string field still drives the whole UI.
 */
export const ICON_MAP = {
  AlertCircle,
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Compass,
  Construction,
ExternalLink,
Facebook,
Factory,
  FileText,
  Forklift,
  Gauge,
  HardHat,
  Headset,
  IndianRupee,
Info,
Instagram,
Layers,
  Mail,
  MapPin,
  MapPinned,
  Menu,
  MessageCircle,
  MoveRight,
  MoveUpRight,
  Navigation,
  Package,
  Phone,
  PhoneCall,
  Quote,
  Route,
  Ruler,
  Send,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Star,
  Timer,
  Truck,
  Warehouse,
  Weight,
  Wrench,
X,
Youtube,
Zap,
}

export const FALLBACK_ICON = Construction

/** All icon names available to BUSINESS_CONFIG. */
export const ICON_NAMES = Object.keys(ICON_MAP)

/**
 * Resolve an icon name from the config into a Lucide component.
 * Falls back to a neutral construction icon for unknown names.
 * @param {string} name
 */
export function getIcon(name) {
  return ICON_MAP[name] ?? FALLBACK_ICON
}

export default ICON_MAP