import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {  Container, Table } from '../../../components';
import { IState } from '../../../ducks';
import FeedbackTable from '../components/FeedbackTable';

import { asyncActions } from '../../../ducks/FeedbackDucks';
import { getFeedbackStatus } from '../../../selectors/FeedbackSelectors';
import { IFeedback } from '../../../models/FeedbackModel';

type IProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const FeedbackLanding : React.FC<IProps> = ({list, fetch_feedbacks, status}) => {
    const fetch_loading = (status['FEEDBACK_FETCH_LIST'] ? 
                    status['FEEDBACK_FETCH_LIST'].fetching : false);

    useEffect(() => {
        fetch_feedbacks();
    }, [fetch_feedbacks])

    return (
        <Fragment>
            <Container>
                <Container.Card>
                    <Container.Header>
                        <Container.Title>Feedbacks</Container.Title>
                    </Container.Header>
                    <Table.Header>
                        <Table.Title>
                            {`No. of Feedbacks :`}
                            <Table.Count>{list ? list.length : 0}</Table.Count>
                        </Table.Title>
                    </Table.Header>
                    <Table>
                        <FeedbackTable
                            list={list ? list as IFeedback[] : []}
                            loading={fetch_loading}
                        />
                    </Table>
                </Container.Card>
            </Container>
        </Fragment>
    )
}


const mapStateToProps = (state: IState) => ({
    list : state.FeedbackReducer.list,
    status : getFeedbackStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetch_feedbacks : asyncActions.fetch_feedbacks
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackLanding);