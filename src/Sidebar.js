import React from "react";
import './Sidebar.scss';
import tabicon from './tabicon.svg';

function GuildHeader() {
    return <header className={"guild_header"}>
        <h1 className={"guild_name"}>{this.props.guild_name}</h1>
    </header>;
}

function Tab({ tab, onTabChange }) {
    const className = tab.selected ? "tab_selected" : "tab_content";
    return <div className={"tab"}>
        <div className={className} onClick={onTabChange} data-name={tab.name}>
            {/* Todo make work */}
            <div className={"tab_icon_container"}>
                <img src={tabicon} alt=""/>
            </div>
            <div className={"tab_name"} data-name={tab.name}>
                {tab.name}
            </div>
        </div>
    </div>
}

function TabList({ tabs, onTabChange }) {
    return<>{
        tabs.map((tab, i) => {
             return <Tab key={i} tab={tab} onTabChange={onTabChange}/>
        })
    }</>;
}

function Sidebar({ onTabChange, guild_name, tabs }) {
    return <div id="sidebar">
        <GuildHeader guild_name={guild_name}/>
        <div className={"tab_sep"}/>
        <TabList tabs={tabs} onTabChange={onTabChange} />
    </div>;
}

export default Sidebar;