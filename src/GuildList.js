import React from "react";
import './GuildList.scss';

class Guild extends React.Component {

    render() {
        const { id, icon, onGuildChange } = this.props;
        
        if(!icon) return <div className={"guild"} onClick={onGuildChange} data-id={id}/>

        return <div className={"guild"}>
            <img onClick={onGuildChange} data-id={id} src={"https://cdn.discordapp.com/icons/" + id + "/" + icon} alt=""/>
        </div>
    }
}

class GuildList extends React.Component {

    render() {
        const { guilds, onGuildChange } = this.props;
        
        let guilds_bot_in = guilds.filter(g => g.bot_in_guild);
        let guilds_bot_not_in = guilds.filter(g => !g.bot_in_guild);

        return <div id="guild_list">
            {
                guilds_bot_in.map((guild, i) => {
                    return <Guild key={guild.id} {...guild} onGuildChange={onGuildChange} />
                })
            }
            <div className={"guild_sep_top_line"}/>
            {
                guilds_bot_not_in.map((guild, i) => {
                    return <Guild key={guild.id} {...guild} onGuildChange={onGuildChange} />
                })
            }
            <div className={"guild_sep"}/>
        </div>;
    }
}

export default GuildList;