import React from "react";
import './SettingList.scss';
import settingicon from './settingicon.svg';

class SettingSection extends React.Component {

    render() {
        return <div className={"setting"}>
            <div className={"setting_content"}>
                <div className={"setting_icon_container"}>
                    <img src={settingicon} alt=""/>
                </div>
                <div className={"setting_name"}>
                    {this.props.name}
                </div>
            </div>
        </div>
    }
}

class SettingList extends React.Component {

    // TODO this is temporary, just like life is
    getSettings() {
        let settings_names = ["category-sets", "role-menus", "moderation", "permissions", "members", "guild-settings"];
        let settings = [];
        for(var name of settings_names) settings.push({name: name});
        return settings;
    }

    render() {
        let settings = this.getSettings();

        return <div id="setting_list">
            <div className={"setting_sep"}/>
            {
                settings.map((setting, i) => {
                    return <SettingSection key={i} name={setting.name} />
                })
            }
        </div>;
    }
}

export default SettingList;