import React, { useState, useEffect, useMemo } from 'react';
import {
    Users,
    FileText,
    CheckCircle2,
    Clock,
    TrendingUp,
    Send,
    Eye,
    Sparkles,
    Search,
    Zap,
    Filter,
    MessageSquare,
    Mail,
    Smartphone,
    Globe,
    Building2,
    Check,
    ChevronRight,
    ShieldCheck,
    AlertCircle
} from 'lucide-react';
import { RequestManager } from './RequestManager';

const requestManager = new RequestManager('http://localhost:3000/api/v1/leads');

export default function BusinessFlowDashboard() {
    const [activeTab, setActiveTab] = useState('approvals');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSource, setSelectedSource] = useState('all');
    const [leads, setLeads] = useState([]);
    const [toastMessage, setToastMessage] = useState(null);

    // Sample AI Pending Approvals with enriched details
    const [pendingApprovals, setPendingApprovals] = useState([
        {
            id: 'Q-2026-089',
            customer: 'Apex Logistics',
            source: 'whatsapp',
            requirement: 'Full fleet management web application with custom API integrations',
            score: 'High Urgency',
            amount: '$4,500.00',
            timestamp: '10 mins ago',
            aiSummary: 'High availability requirement; client budget matches Tier-2 Enterprise package.',
            confidence: 96
        },
        {
            id: 'Q-2026-090',
            customer: 'GreenValley Organics',
            source: 'email',
            requirement: 'E-commerce platform setup with automated inventory sync',
            score: 'Medium Urgency',
            amount: '$1,850.00',
            timestamp: '25 mins ago',
            aiSummary: 'Standard e-commerce flow requested. Quotation auto-assembled from pricing engine.',
            confidence: 91
        },
        {
            id: 'Q-2026-091',
            customer: 'Nexus Tech Labs',
            source: 'discord',
            requirement: 'Custom webhook workflow automation for engineering notifications',
            score: 'High Urgency',
            amount: '$3,200.00',
            timestamp: '42 mins ago',
            aiSummary: 'Urgent timeline requested. Scope verified against dev availability.',
            confidence: 98
        }
    ]);

    // Load leads from SQLite Backend on Mount
    useEffect(() => {
        async function loadLeads() {
            const rankedLeads = await requestManager.getAllRankedRequests();
            setLeads(rankedLeads);
        }
        loadLeads();
    }, []);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const handleApprove = (id, customer) => {
        setPendingApprovals(prev => prev.filter(item => item.id !== id));
        triggerToast(`Quotation ${id} for ${customer} approved & dispatched via AWS SES!`);
    };

    // Helper for source badges & icons
    const getSourceBadge = (source) => {
        const src = source?.toLowerCase();
        switch (src) {
            case 'whatsapp':
                return {
                    icon: <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />,
                    label: 'WhatsApp',
                    style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                };
            case 'discord':
                return {
                    icon: <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />,
                    label: 'Discord',
                    style: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                };
            case 'email':
                return {
                    icon: <Mail className="h-3.5 w-3.5 text-cyan-400" />,
                    label: 'Email',
                    style: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                };
            case 'sms':
                return {
                    icon: <Smartphone className="h-3.5 w-3.5 text-amber-400" />,
                    label: 'SMS',
                    style: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                };
            default:
                return {
                    icon: <Globe className="h-3.5 w-3.5 text-slate-400" />,
                    label: source || 'Web',
                    style: 'bg-slate-800 text-slate-300 border-slate-700'
                };
        }
    };

    // Filtered Leads Calculation
    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            const matchesSearch =
            lead.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.requirement?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSource = selectedSource === 'all' || lead.source?.toLowerCase() === selectedSource.toLowerCase();
            return matchesSearch && matchesSource;
        });
    }, [leads, searchTerm, selectedSource]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">

        {/* Background Ambient Glow FX */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Floating Action Toast Notification */}
        {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all">
            <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-3 text-xs font-medium">
            <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400">
            <Check className="h-4 w-4" />
            </div>
            <span>{toastMessage}</span>
            </div>
            </div>
        )}

        {/* Header */}
        <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
        <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
        <Zap className="h-5 w-5 text-white fill-white" />
        </div>
        <div>
        <div className="flex items-center space-x-2">
        <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        BusinessFlow AI
        </h1>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 uppercase tracking-widest">
        Agent v2.4
        </span>
        </div>
        <p className="text-xs text-slate-400">Autonomous Operations & Quote Orchestration</p>
        </div>
        </div>

        <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-300 shadow-inner">
        <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono text-slate-400">LLM Engine:</span>
        <span className="font-semibold text-emerald-400">Amazon Bedrock</span>
        </div>

        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/10">
        <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-xs text-indigo-300">
        AB
        </div>
        </div>
        </div>
        </header>

        {/* Main Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">

        {/* Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Card 1 */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-slate-700 transition-all group">
        <div className="flex justify-between items-center text-slate-400 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Approvals</span>
        <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
        <Clock className="h-4 w-4" />
        </div>
        </div>
        <div className="text-3xl font-black text-slate-100">{pendingApprovals.length}</div>
        <p className="text-xs text-amber-400/90 mt-2 flex items-center font-medium">
        <AlertCircle className="h-3.5 w-3.5 mr-1" />
        Requires human sign-off
        </p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-slate-700 transition-all group">
        <div className="flex justify-between items-center text-slate-400 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ranked Lead Pipeline</span>
        <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
        <Users className="h-4 w-4" />
        </div>
        </div>
        <div className="text-3xl font-black text-slate-100">{leads.length}</div>
        <p className="text-xs text-indigo-400/90 mt-2 flex items-center font-medium">
        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
        SQLite Real-time Sync
        </p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-slate-700 transition-all group">
        <div className="flex justify-between items-center text-slate-400 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Auto Invoices Dispatched</span>
        <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
        <FileText className="h-4 w-4" />
        </div>
        </div>
        <div className="text-3xl font-black text-slate-100">142</div>
        <p className="text-xs text-cyan-400/90 mt-2 flex items-center font-medium">
        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
        Synced with Google Sheets
        </p>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-slate-700 transition-all group">
        <div className="flex justify-between items-center text-slate-400 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ops Efficiency Boost</span>
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
        <TrendingUp className="h-4 w-4" />
        </div>
        </div>
        <div className="text-3xl font-black text-slate-100">84%</div>
        <p className="text-xs text-emerald-400/90 mt-2 flex items-center font-medium">
        <Sparkles className="h-3.5 w-3.5 mr-1" />
        Autonomous processing
        </p>
        </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 gap-4 pb-2">
        <div className="flex space-x-2">
        <button
        onClick={() => setActiveTab('approvals')}
        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'approvals'
            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/20'
            : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
        }`}
        >
        <Clock className="h-3.5 w-3.5" />
        <span>Quotation Queue</span>
        <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/20 text-[10px] text-white">
        {pendingApprovals.length}
        </span>
        </button>

        <button
        onClick={() => setActiveTab('crm')}
        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'crm'
            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/20'
            : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
        }`}
        >
        <Users className="h-3.5 w-3.5" />
        <span>Live Lead Directory</span>
        <span className="ml-1.5 px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
        {leads.length}
        </span>
        </button>
        </div>

        {activeTab === 'crm' && (
            <div className="flex items-center space-x-2">
            {['all', 'whatsapp', 'discord', 'email', 'sms'].map((src) => (
                <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all ${
                    selectedSource === src
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
                >
                {src}
                </button>
            ))}
            </div>
        )}
        </div>

        {/* TAB 1: QUOTATION APPROVALS QUEUE */}
        {activeTab === 'approvals' && (
            <section className="space-y-4">
            <div className="flex items-center justify-between">
            <div>
            <h2 className="text-base font-bold text-slate-200">AI-Generated Proposals Awaiting Owner Sign-Off</h2>
            <p className="text-xs text-slate-400">Review quotes created by Bedrock before automatic dispatch.</p>
            </div>
            </div>

            {pendingApprovals.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20 backdrop-blur-sm">
                <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-500/60 mb-3 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-300">Approval Queue Cleared!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                All generated client quotations have been dispatched to clients.
                </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                {pendingApprovals.map((item) => {
                    const badge = getSourceBadge(item.source);
                    return (
                        <div
                        key={item.id}
                        className="bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all backdrop-blur-md hover:shadow-xl hover:shadow-indigo-500/5 group"
                        >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                        {/* Request Body */}
                        <div className="space-y-3 max-w-2xl">
                        <div className="flex items-center flex-wrap gap-2.5">
                        <span className="font-bold text-slate-100 text-lg flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-indigo-400" />
                        {item.customer}
                        </span>

                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${badge.style}`}>
                        {badge.icon}
                        {badge.label}
                        </span>

                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400">
                        {item.score}
                        </span>

                        <span className="text-[11px] text-slate-500 font-mono ml-auto lg:ml-0">
                        ID: {item.id}
                        </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                        <strong className="text-slate-400">Client Requirement:</strong> {item.requirement}
                        </p>

                        {/* AI Reasoning Summary Box */}
                        <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-3 text-xs text-indigo-200 flex items-start space-x-2.5">
                        <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                        <span className="font-bold text-indigo-300 text-[11px]">AI Logic Rationale</span>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                        {item.confidence}% Match Confidence
                        </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{item.aiSummary}</p>
                        </div>
                        </div>
                        </div>

                        {/* Quote Amount & CTA */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between border-t lg:border-t-0 border-slate-800/80 pt-4 lg:pt-0 gap-4">
                        <div className="text-left lg:text-right">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Calculated Quote</span>
                        <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                        {item.amount}
                        </span>
                        </div>

                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-3.5 py-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center space-x-1.5 transition-all">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Preview Quote</span>
                        </button>

                        <button
                        onClick={() => handleApprove(item.id, item.customer)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-1.5 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                        >
                        <Send className="h-3.5 w-3.5" />
                        <span>Approve & Send</span>
                        </button>
                        </div>
                        </div>

                        </div>
                        </div>
                    );
                })}
                </div>
            )}
            </section>
        )}

        {/* TAB 2: LIVE CRM LEAD DIRECTORY */}
        {activeTab === 'crm' && (
            <section className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Table Search Header */}
            <div className="p-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60">
            <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-500" />
            <input
            type="text"
            placeholder="Search lead by name or requirement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            </div>

            <div className="flex items-center space-x-3 text-xs text-slate-400">
            <Filter className="h-3.5 w-3.5 text-slate-500" />
            <span>Showing <strong>{filteredLeads.length}</strong> of {leads.length} total records</span>
            </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800/80">
            <tr>
            <th className="p-4">Customer</th>
            <th className="p-4">Channel Source</th>
            <th className="p-4">Requirement Details</th>
            <th className="p-4">AI Urgency Ranking</th>
            <th className="p-4 text-right">Received</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
            {filteredLeads.length === 0 ? (
                <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">
                No leads matched your filter criteria.
                </td>
                </tr>
            ) : (
                filteredLeads.map((lead) => {
                    const badge = getSourceBadge(lead.source);
                    return (
                        <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="p-4 font-bold text-slate-200">
                        <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-500/80"></span>
                        <span>{lead.customerName}</span>
                        </div>
                        </td>
                        <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${badge.style}`}>
                        {badge.icon}
                        {badge.label}
                        </span>
                        </td>
                        <td className="p-4 text-slate-300 max-w-md truncate">
                        {lead.requirement}
                        </td>
                        <td className="p-4">
                        <div className="flex items-center space-x-3">
                        <div className="w-20 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                        className={`h-full rounded-full transition-all duration-500 ${
                            lead.importanceScore >= 80
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : lead.importanceScore >= 60
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                            : 'bg-slate-600'
                        }`}
                        style={{ width: `${lead.importanceScore}%` }}
                        />
                        </div>
                        <span className="font-mono text-slate-300 font-medium">
                        {lead.importanceScore}/100
                        </span>
                        </div>
                        </td>
                        <td className="p-4 text-right text-slate-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        </tr>
                    );
                })
            )}
            </tbody>
            </table>
            </div>
            </section>
        )}

        </main>
        </div>
    );
}
