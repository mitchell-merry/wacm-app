import { useState } from 'react'

const tabs_with_bot = ["guild-settings","category-sets", "role-menus", "moderation", "permissions", "members",];
const tabs_wout_bot = ["invite-me"];

const useTabs = (current_guild, current_tab_name) => {
    let tabs = current_guild.bot_in_guild ? 
        tabs_with_bot.map(tab => {return {name: tab, selected: false}}) :
        tabs_wout_bot.map(tab => {return {name: tab, selected: false}});
    
    let current_tab_idx = tabs.findIndex(tab => tab.name === current_tab_name);
    if(!current_tab_idx) current_tab_idx = 0;
    tabs[current_tab_idx].selected = true;

    return tabs;
}

export default useTabs;