import React, { Component } from 'react';
import { Grid, Button, Typography, Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import { api } from '../utils/Api';
export default class Imagefilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smoothing_effects: [
                { label: 'Blur', key: 'blur' },
                { label: 'Gaussian Blur', key: 'gaussian_blur' },
                { label: 'Median Blur', key: 'median_blur' },
                { label: 'Bilateral Blur', key: 'median_filter' },
            ],
            render: {},
        };
    }

    applyEffect(effect) {
        api('apply_filter', { type: effect, data: this.props.image_data }).then(res => {
            const filtered_data = res;
            const render = this.state.render;
            render[effect] = filtered_data.data;
            this.setState({ render });
        });
    }

    getFilterData = effect => {
        if (this.state.render[effect]) {
            return this.state.render[effect];
        }
        return this.props.image_data;
    };

    render() {
        if (!this.props.image_data) {
            return <div />;
        }
        return (
            <Grid container>
                {this.state[this.props.type].map((effect, i) => {
                    return (
                        <Grid item md={4} key={i}>
                            <Card>
                                <CardHeader title={`${effect.label}`}></CardHeader>
                                <CardContent>
                                    <img src={this.getFilterData(effect.key)} alt='' height='300px' />
                                    <Button variant='contained' align='center' color='secondary' onClick={() => this.applyEffect(effect.key)}>
                                        Generate
                                    </Button>
                                </CardContent>
                            </Card>
                            <Divider />
                        </Grid>
                    );
                })}
            </Grid>
        );
    }
}
