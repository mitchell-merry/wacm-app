import React from "react";
import './Content.scss';
import InvitePane from './panes/InvitePane';

function Content({ currentTabId, botInfo }) {
    return <div className={"content"}>
        {currentTabId === "invite-me" ?
            <InvitePane botInfo={botInfo} /> :
            undefined
        }
    </div>
}

export default Content;