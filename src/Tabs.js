const tabsWithBot = ["guild-settings","category-sets", "role-menus", "moderation", "permissions", "members", "remove-me"];
const tabsWOutBot = ["invite-me"];

const useTabs = (guilds, currentGuildId, currentTabId) => {
    if(!currentGuildId || !guilds) return undefined;
    
    const currentGuild = guilds.find(s => s.id === currentGuildId);

    let tabs = currentGuild.bot_in_guild ? 
        tabsWithBot.map(tab => {return {name: tab, selected: false}}) :
        tabsWOutBot.map(tab => {return {name: tab, selected: false}});
    
    let current_tab_idx = tabs.findIndex(tab => tab.name === currentTabId);
    
    if(current_tab_idx === -1) current_tab_idx = 0;
    tabs[current_tab_idx].selected = true;

    return tabs;
}

export default useTabs;