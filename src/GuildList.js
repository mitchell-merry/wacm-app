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
        const {user_guilds, onGuildChange} = this.props;
        
        return <div id="guild_list">
            {
                user_guilds.map((guild, i) => {
                    return <Guild key={guild.id} {...guild} onGuildChange={onGuildChange}/>
                })
            }
            <div className={"guild_sep"}/>
        </div>;
    }
}

export default GuildList;