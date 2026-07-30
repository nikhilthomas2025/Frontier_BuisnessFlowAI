import React from 'react';
import { Zap } from 'lucide-react';

export default function Header() {
    return (
        <header className="border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] ring-1 ring-white/20">
        <Zap className="h-5 w-5 text-white fill-white" />
        </div>
        <div>
        <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
        BusinessFlow AI
        </h1>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 uppercase tracking-widest">
        Agent v2.4
        </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">Autonomous Operations Center</p>
        </div>
        </div>

        <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs shadow-inner">
        <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-slate-400">LLM Engine:</span>
        <span className="font-semibold text-emerald-400">Amazon Bedrock</span>
        </div>
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px] cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
        <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-xs text-indigo-300">
        AB
        </div>
        </div>
        </div>
        </header>
    );
}
