import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/landing';
import _10dayWeather from './_10_day_weather/landing';
import _Emergency from './_emergency/landing';
import _GaleWarning from './_gale_warning/landing';
import _Seasonal from './_seasonal/landing';
import __TropicalCyclone from './__Tropical_cyclone/landing';
import __OtherWeather from './__other_weather/landing';

const AdvisoryRoute = () => {
    return (
        <Switch>
            <Route path="/sagip/advisory/:tab?" exact component={Landing}/>
            <Route path="/sagip/advisory/add/10_day_weather" exact component={_10dayWeather}/>
            <Route path="/sagip/advisory/add/emergency" exact component={_Emergency}/>
            <Route path="/sagip/advisory/add/gale_warning" exact component={_GaleWarning}/>
            <Route path="/sagip/advisory/add/seasonal" exact component={_Seasonal}/>
            <Route path="/sagip/advisory/add/tropical_cyclone" exact component={__TropicalCyclone}/>
            <Route path="/sagip/advisory/add/other_weather_system" exact component={__OtherWeather}/>
        </Switch>
    )
}

export default AdvisoryRoute;