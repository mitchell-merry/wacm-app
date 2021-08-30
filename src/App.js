import React from "react";
import './App.scss';
import GuildList from './GuildList.js';
import SettingList from './SettingList.js';

class GuildHeader extends React.Component {

    render() {
        return <header className={"guild_header"}>
            <h1 className={"guild_name"}>{this.props.guild_name}</h1>
        </header>;
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { current_guild_id: false, user_guilds: false, bot_guilds: false };

        this.handleGuildChange = this.handleGuildChange.bind(this);
    }

    handleGuildChange(event) {
        const {id} = event.target.dataset;
        this.setState({
            current_guild_id: id,
        });
    };

    // Fetch the guilds?
    async fetchGuildsForUser() {
        const resp = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                authorization: this.props.authorization,
            },
        });
        const json = await resp.json();
        return json.filter(s => (s.permissions & 8) !== 0)
    }

    // Fetch guilds the bot is in
    async fetchGuildsForBot() {
        return undefined;
    }

    async fetchGuildsAndUpdate() {
        const user_guilds = await this.fetchGuildsForUser();
        const bot_guilds = await this.fetchGuildsForBot();

        this.setState({user_guilds, bot_guilds});
    }

    componentDidMount() {
        this.fetchGuildsAndUpdate();
    }

    render() {
        const { user_guilds, current_guild_id } = this.state;
        
        if(!user_guilds) return <></>;
        
        let current = user_guilds.find(s => s.id === current_guild_id);
        if(!current) current = user_guilds[0];

        return <div id="app">
            <div className="app_container">
                <GuildList onGuildChange={this.handleGuildChange} user_guilds={user_guilds}/>
                <div id="app-main">
                    <GuildHeader guild_name={current.name} />
                    <SettingList />
                </div>
            </div>
        </div>;
    }
}

export default App;
