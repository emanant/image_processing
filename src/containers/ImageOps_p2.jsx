import React, { Component } from 'react';
import { Container, Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import WebCamCapture from '../components/WebCamCapture';
import Imagefilters from '../components/Imagefilters';

export default class ImageOpsConatainers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_data: null,
        };
    }

    saveCapturedImage = data => {
        this.setState({ image_data: data });
    };

    render() {
        return (
            <Container maxWidth='md'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant='body1' color='textPrimary' component='p'>
                                    Image Processing Part-2
                                </Typography>
                                <Typography varient='h6' color='textPrimary' component='h6'>
                                    Camera Preview
                                </Typography>
                                <WebCamCapture saveCapturedImage={data => this.saveCapturedImage(data)} />
                                {/* <img src={this.state.image_data || 'https://via.placeholder.com/150'} className='pt-3' /> */}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {this.state.image_data && (
                    <Grid item md={12}>
                        <CardHeader title='Captured Image'></CardHeader>
                        <img src={this.state.image_data} alt='' height='300px'></img>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6' color='textPrimary' component='h6'>
                                IMAGE SMOOTH FILTERS
                            </Typography>
                            <Imagefilters image_data={this.state.image_data} type='smoothing_effects' />
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        );
    }
}
