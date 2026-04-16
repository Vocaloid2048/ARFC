import React from "react";
import { Star, ExternalLink, Quote, Sparkles, TestTube2, MessageSquare, Terminal, Target, Clock, Users, MessageCircle, Globe, Compass } from "lucide-react";
import AboutSection from "../components/AboutSection";
import AboutGridItem from "../components/AboutGridItem";
import { locale } from "../utils/UtilTools";

export default function About() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-[var(--page-bg)]">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header Section */}
                <header className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
                        {locale("ui.about.title")}
                    </h1>

                    <div className="relative py-10">
                        <Quote className="absolute top-0 left-0 w-10 h-10 text-slate-700 opacity-30" />
                        <blockquote className="text-xl md:text-2xl text-slate-300 italic font-medium px-12 leading-relaxed">
                            {locale("ui.about.quote")}
                        </blockquote>
                        <Quote className="absolute bottom-0 right-0 w-10 h-10 text-slate-700 opacity-30 transform rotate-180" />
                    </div>
                </header>

                {/* System Section */}
                <AboutSection icon={<TestTube2 className="w-6 h-6 text-blue-400" />} title={locale("ui.about.system_title")}>
                    <div className="grid md:grid-cols-2 gap-8 text-slate-300 text-lg leading-relaxed">
                        <p className="md:col-span-2">{locale("ui.about.system_p1")}</p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:col-span-2 mt-4">
                            <AboutGridItem icon={<Target size={28} className="indicator-text-A" />} title={locale('ui.arfc.category.attitude_target.title')} />
                            <AboutGridItem icon={<Clock size={28} className="indicator-text-R" />} title={locale('ui.arfc.category.rythm_of_work.title')} />
                            <AboutGridItem icon={<Users size={28} className="indicator-text-F" />} title={locale('ui.arfc.category.function.title')} />
                            <AboutGridItem icon={<MessageCircle size={28} className="indicator-text-C" />} title={locale('ui.arfc.category.communication.title')} />
                        </div>

                        <p className="md:col-span-2 italic text-slate-400 text-base border-l-2 border-slate-800 pl-4 py-1">{locale("ui.about.system_p2")}</p>
                    </div>
                </AboutSection>

                {/* Join Section */}
                <section className="space-y-8">
                    <AboutSection icon={<MessageSquare className="w-6 h-6 text-purple-400" />} title={locale("ui.about.join_title")}>
                        <p className="text-slate-300 text-lg leading-relaxed">{locale("ui.about.join_p1")}</p>

                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                            {[
                                { label: locale("ui.about.join_issue"), icon: <ExternalLink size={18} /> },
                                { label: locale("ui.about.join_code"), icon: <Terminal size={18} /> },
                                { label: locale("ui.about.join_trans"), icon: <Globe className="w-[18px] h-[18px]" /> },
                                { label: locale("ui.about.join_share"), icon: <Sparkles size={18} /> }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-slate-300 p-4 bg-slate-600/20 border border-slate-800/30 hover:bg-slate-800/50 hover:border-slate-700 rounded-2xl transition-all cursor-default">
                                    <div className="text-slate-500 bg-slate-900 p-2 rounded-lg">{item.icon}</div>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </AboutSection>
                </section>

                {/* Story Section */}
                <AboutSection icon={<Sparkles className="w-6 h-6 text-yellow-500" />} title={locale("ui.about.story_title")}>
                    <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                        <p>{locale("ui.about.story_p1")}</p>
                        <p>{locale("ui.about.story_p2")}</p>
                        <p>{locale("ui.about.story_p3")}</p>
                    </div>
                </AboutSection>

                {/* Developer Section */}
                <AboutSection icon={<Terminal className="w-6 h-6 text-green-400" />} title={locale("ui.about.dev_title")}>
                    <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                        <p>{locale("ui.about.dev_p1")}</p>
                        <div className="pt-6 mt-6 border-t border-slate-800/50">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 text-slate-300 p-4 bg-slate-600/20 border border-slate-800/30 hover:bg-slate-800/50 hover:border-slate-700 rounded-2xl transition-all cursor-default">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-100 flex items-center gap-3">
                                            <span className="text-slate-500 bg-slate-900 p-2 rounded-lg flex-shrink-0">
                                                <Terminal className="w-5 h-5 text-green-400" />
                                            </span>
                                            {locale("ui.about.dev_status_title")}
                                        </h4>
                                        <p className="text-slate-400 text-sm mt-1">{locale("ui.about.dev_status_p1")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-slate-300 p-4 bg-slate-600/20 border border-slate-800/30 hover:bg-slate-800/50 hover:border-slate-700 rounded-2xl transition-all cursor-default">
                                    <div className="flex-2">
                                        <h4 className="font-bold text-slate-100 flex items-center gap-3">
                                            <span className="text-slate-500 bg-slate-900 p-2 rounded-lg flex-shrink-0">
                                                <Star className="w-5 h-5 text-yellow-400" />
                                            </span>
                                            
                                            {locale("ui.about.thanks_title")}
                                        </h4>
                                        <p className="text-slate-400 text-sm mt-1">
                                            ．Project Idea was inspired from <a href="https://acgti.tianxingleo.top/" className="hrefstyle">ACGTI by tianxingleo</a> <br/>
                                            ．UI/UX Style was inspired from <a href="https://www.16personalities.com/" className="hrefstyle">16personalities</a>, some of the layout design were adapted from ACGTI<br/>
                                            <br/> Disclaimer: This is an open source project with AI-participate.
                                            <br/>  - Image: Copilot
                                            <br/>  - Code: GitHub Copilot (GPT-5 mini、Gemini 3.1 Pro)
                                            <br/>  - Text: Gemini 3
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AboutSection>
            </div>
        </div>
    );
}
