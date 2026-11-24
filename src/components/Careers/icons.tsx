import {
  BarChart3, BookOpen, Building2, CheckCircle2, Clock, Code2, Cpu, Handshake, Heart, Laptop, Music,
  Phone, Rocket, Route, Send, Smartphone, Sparkles, Sun, Users, Wallet, type LucideIcon,
} from 'lucide-react';
import type { BenefitIcon, JourneyIcon, StepIcon } from '@/data/careers';

export const journeyIcons: Record<JourneyIcon, LucideIcon> = {
  spark: Sparkles, building: Building2, code: Code2, phone: Smartphone, route: Route,
  chart: BarChart3, book: BookOpen, music: Music, cpu: Cpu, users: Users,
};

export const benefitIcons: Record<BenefitIcon, LucideIcon> = {
  wallet: Wallet, laptop: Laptop, clock: Clock, book: BookOpen, heart: Heart, sun: Sun, rocket: Rocket, users: Users,
};

export const stepIcons: Record<StepIcon, LucideIcon> = {
  send: Send, phone: Phone, users: Users, code: Code2, check: CheckCircle2, handshake: Handshake,
};
