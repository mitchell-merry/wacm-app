import React from "react";
import '../Content.scss';

function GuildSettingsPane({ guild, botInfo }) {
    return <div id="guild-settings-pane">
        {JSON.stringify(guild, null, 2)}
    </div>;
}

export default GuildSettingsPane;