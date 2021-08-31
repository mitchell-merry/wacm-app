import React from "react";
import './App.scss';
import GuildList from './GuildList.js';
import Sidebar from './Sidebar.js';
import Pane from './Pane.js';
import { server } from './config';
import { useTabs } from './Tabs';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            current_guild_id: false, 
            current_tab: false,
            guilds: false,
        };

        this.handleGuildChange = this.handleGuildChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleGuildChange(event) {
        const {id} = event.target.dataset;
        this.setState({
            current_guild_id: id,
        });
    };

    handleTabChange(event) {
        const { name } = event.target.dataset;
        this.setState({
            current_tab: name,
        });
    }

    // Fetch the guilds?
    async fetchGuildsForUser() {
        const resp = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                authorization: this.props.authorization,
            },
        });
        const json = await resp.json();
        return json.filter(s => (s.permissions & 8) !== 0);
    }

    // Fetch guilds the bot is in
    async fetchGuildsForBot() {
        const resp = await fetch(server + '/api/v1/guild');
        const json = await resp.json();
        return json;
    }

    async fetchGuildsAndUpdate() {
        const user_guilds = await this.fetchGuildsForUser();
        const bot_guilds = await this.fetchGuildsForBot();
        
        let guilds = user_guilds.map((guild) => {
            // Get corresponding guild in bot_guilds
            let bot_guild_settings = bot_guilds.find(bg => bg.guild_id === guild.id);
            // Combine the objects, and add a new field to see if the bot is in that guild, excluding guild_id
            let {guild_id, ...r} = {...guild, ...bot_guild_settings, bot_in_guild: !!bot_guild_settings};
            return r;
        });
        console.log(guilds);

        this.setState({current_guild_id: guilds[0].id, guilds});
    }

    componentDidMount() {
        this.fetchGuildsAndUpdate();
    }

    render() {
        const { guilds, current_guild_id, current_tab } = this.state;
        
        // TODO expand on the loading screen / tidy
        if(!guilds) return <>{"Loading..."}</>;
        
        let current = guilds.find(s => s.id === current_guild_id);
        if(!current) current = guilds.find(s => s.bot_in_guild);
        console.log(current_tab);
        return <div id="app">
            <div className="app_container">
                <GuildList 
                    onGuildChange={this.handleGuildChange} 
                    guilds={guilds}
                />
                <div id="app-main">
                    <Sidebar 
                        guild_name={current.name}
                        onTabChange={this.handleTabChange} 
                        bot_in_guild={current.bot_in_guild} 
                        current_tab={current_tab}
                    />
                    <Pane />
                </div>
            </div>
        </div>;
    }
}

export default App;
