import React, { useState, useEffect } from "react";
import './App.scss';
import GuildList from './GuildList.js';
import Sidebar from './Sidebar.js';
import Content from './Content.js';
import { server } from './config';
import useTabs from './Tabs';
import { AppLoading } from './AppExtra.js';

// Fetch the guilds the user is admin in
async function fetchGuildsForUser(authorization) {
    const resp = await fetch('https://discord.com/api/users/@me/guilds', { headers: { authorization }});
    const json = await resp.json();
    // Only guilds where the user has the admin permission
    return json.filter(s => (s.permissions & 8) !== 0);
}

// Fetch guilds the bot is in
async function fetchGuildsForBot() {
    const resp = await fetch(server + '/api/v1/guild');
    const json = await resp.json();
    return json;
}

// Fetch bot information
async function fetchBotInfo() {
    const resp = await fetch(server + '/api/v1/bot');
    const json = await resp.json();
    return json;
}

function App({authorization}) {
    const [ guilds, setGuilds ] = useState(false);
    const [ botInfo, setBotInfo ] = useState(false);
    const [ currentGuildId, setCurrentGuildId ] = useState(false);
    const [ currentTabId, setCurrentTabId ] = useState(false);

    const tabs = useTabs(guilds, currentGuildId, currentTabId);

    useEffect(() => {
        async function fetchAll() {
            const user_guilds = await fetchGuildsForUser(authorization);
            const bot_guilds = await fetchGuildsForBot();
            
            const guilds = user_guilds.map((guild) => {
                // Get corresponding guild in bot_guilds
                let bot_guild_settings = bot_guilds.find(bg => bg.guild_id === guild.id);
                // Combine the objects, and add a new field to see if the bot is in that guild, excluding guild_id
                let {guild_id, ...g} = {...guild, ...bot_guild_settings, bot_in_guild: !!bot_guild_settings};
                return g;
            });
            
            setCurrentGuildId(guilds[0].id);
            setGuilds(guilds);

            const botInfo = await fetchBotInfo();
            setBotInfo(botInfo);
        }
        fetchAll();
    }, [authorization]);

    if(!guilds || !currentGuildId || !botInfo) return <AppLoading />;
    
    // To make sure the current tab ID is synchronised
    let currentTab = tabs.find(t => t.selected);
    if(!currentTabId || !currentTab || currentTab.name !== currentTabId) setCurrentTabId(tabs.find(t => t.selected).name);

    let current = guilds.find(s => s.id === currentGuildId);

    return <div id="app">
        <GuildList 
            onGuildChange={(e) => setCurrentGuildId(e.target.dataset.id)} 
            guilds={guilds}
        />
        <Sidebar 
            guild_name={current.name}
            onTabChange={(e) => setCurrentTabId(e.target.dataset.name)} 
            tabs={tabs}
        />
        <Content currentTabId={currentTabId} botInfo={botInfo}/>
    </div>;
}

export default App;