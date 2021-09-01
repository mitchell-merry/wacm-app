import React from "react";
import '../Content.scss';
import { invite } from '../config';

function InvitePane({ botInfo }) {
    return <div id="invite-pane">
        <div id="invite-box">
            <h2>Invite Bot to Server</h2>
            <img src={`https://cdn.discordapp.com/avatars/${botInfo.id}/${botInfo.avatar}.png`} alt=""/>
            <a href={invite}>Invite Me</a>
        </div>
    </div>;
}

export default InvitePane;