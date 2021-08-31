import React from "react";
import './Sidebar.scss';
import tabicon from './tabicon.svg';

class GuildHeader extends React.Component {

    render() {
        return <header className={"guild_header"}>
            <h1 className={"guild_name"}>{this.props.guild_name}</h1>
        </header>;
    }
}

class Tab extends React.Component {

    render() {
        const { selected, name, onTabChange } = this.props;
        return <div className={"tab"}>
            <div className={selected ? "tab_selected" : "tab_content"} onClick={onTabChange} data-name={name}>
                 {/* Todo make work */}
                <div className={"tab_icon_container"}>
                    <img src={tabicon} alt=""/>
                </div>
                <div className={"tab_name"} data-name={name}>
                    {name}
                </div>
            </div>
        </div>
    }
}

class Sidebar extends React.Component {

    // TODO this is temporary, just like life is
    getTabs() {
        if(!this.props.bot_in_guild) return ["invite-me"];
        return ["guild-settings","category-sets", "role-menus", "moderation", "permissions", "members",];
        // let tabs = [];
        // for(var name of tab_names) tabs.push({name: name});
        // return tabs;
    }

    render() {
        const { current_tab, onTabChange, guild_name } = this.props;
        let tabs = this.getTabs();
        // if(!current_tab) current_tab = tabs[0];
        return <div id="sidebar">
            <GuildHeader guild_name={guild_name}/>
            <div className={"tab_sep"}/>
            {
                tabs.map((tab, i) => {
                    return <Tab key={i} name={tab} selected={tab===current_tab} onTabChange={onTabChange}/>
                })
            }
        </div>;
    }
}

export default Sidebar;