import React from 'react';
import { Result } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Livelihood from './livelihood/pages/landing';
// import Risk from './risk/pages/landing';
// import ProductionStage from './production_stage/pages/landing';
import Seed from './seeds/pages/landing';
import PreProduction from './other_production/pages/landing';
// import StartPlanting from './start_planting/pages/landing';
// import ActualRainfall from './actual_rainfall/pages/landing';
// import NormalRainfall from './normal_rainfall/pages/landing';
// import LaNinaRainfall from './la_nina_rainfall/pages/landing';
// import ElNinoRainfall from './el_nino_rainfall/pages/landing';

import Hazard from './hazard/pages/landing';
import ClimateData from './climate_data/pages/landing';

import { IState } from '../../ducks'

const ConfigurationRoute = () => {
    const user = useSelector((state : IState) => state.UserReducer.data);
    if(user && user.role === 'PAGASA') {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
            />
        )
    };

    return (
        <Switch>
            <Route exact path="/sagip/configuration/livelihood" component={Livelihood}/>
            {/* <Route exact path="/sagip/configuration/risk" component={Risk}/>
            <Route exact path="/sagip/configuration/production_stage" component={ProductionStage}/> */}
            <Route exact path="/sagip/configuration/seed" component={Seed}/>
            <Route exact path="/sagip/configuration/other" component={PreProduction}/>
            {/* <Route exact path="/sagip/configuration/planting" component={StartPlanting}/>  */}
            {/* <Route exact path="/sagip/configuration/actualrainfall" component={ActualRainfall}/>
            <Route exact path="/sagip/configuration/normalrainfall" component={NormalRainfall}/>
            <Route exact path="/sagip/configuration/el_nino_rainfall" component={ElNinoRainfall}/>
            <Route exact path="/sagip/configuration/la_nina_rainfall" component={LaNinaRainfall}/> */}

            <Route exact path="/sagip/configuration/climate_data" component={ClimateData}/>
            <Route exact path="/sagip/configuration/hazard" component={Hazard}/>

        </Switch>
    )
}

export default ConfigurationRoute;
