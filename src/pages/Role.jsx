import React from 'react';
import roles from '../assets/data/role_data.json';
import { locale, tintColor } from '../utils/utilTool';

export default function Role() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-900 text-slate-100">
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-100 mb-4 tracking-tight leading-tight">
                        角色圖鑑
                    </h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {roles.map((role) => {
                        const animalName = locale(`role.${role.animal}.animal_name`);
                        const tagName = locale(`role.${role.animal}.tag.name`);
                        const shortDesc = locale(`role.${role.animal}.short`);

                        return (<RoleItem key={role.id} role={role} animalName={animalName} tagName={tagName} shortDesc={shortDesc} />)
                    })}
                </div>
            </main>
        </div>
    );
}

export function RoleItem({ role, animalName, tagName, shortDesc }) {
    return (
        <div key={role.id} className="bg-slate-800 rounded-[24px] shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group cursor-pointer border border-slate-700">
            {/* 圖片區 (上半部) */}
            <div
                className="h-56 relative w-full flex items-center justify-center p-6 transition-transform duration-500"
                style={{
                    background: `linear-gradient(135deg, ${role.colors[0]}15, ${role.colors[1]}30)`
                }}
            >
                <img
                    src={`/role_images/${role.image}`}
                    alt={animalName}
                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                />
            </div>

            {/* 文字區 (下半部) */}
            <div
                className="p-6 flex-1 flex flex-col z-10 -mt-4 backdrop-blur-sm"
                style={{
                    background: 'linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,0.4) 25%, rgba(15,23,42,0.4) 100%)'
                }}
            >
                {/* 標籤 */}
                {role.tag && (<div className="flex gap-2 mb-4 mt-4 flex-wrap">
                    <span
                        className="px-3 py-1 rounded-full text-xs font-bold tracking-wider"
                        style={{
                            backgroundColor: `${role.colors[0]}30`,
                            color: tintColor(role.colors[0], '#ffffff', 0.6),
                            boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.25)'
                        }}
                    >
                        {role.tag}
                    </span>
                </div>)}

                {/* 標題 */}
                {animalName && (
                    <h2 className="text-xl font-bold text-slate-100 mb-1">
                        {animalName}
                    </h2>
                )}

                {/* 副標題 */}
                {tagName && (
                    <h3 className="text-xs font-medium text-slate-300 mb-4 tracking-widest uppercase">
                        {tagName}
                    </h3>
                )}

                {/* 描述 */}
                {shortDesc && <p className="text-slate-300 text-sm leading-relaxed mt-auto font-medium">
                    {shortDesc}
                </p>}
            </div>
        </div>
    );
}