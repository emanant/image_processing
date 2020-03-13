import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { Grid, Button } from '@material-ui/core';

export default class WebCamCaptureContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VideoConstants: {
                width: 1200,
                height: 700,
                facingMode: 'user',
            },
        };
    }

    captureImage = () => {
        this.props.saveCapturedImage(this.refs.webcam.getScreenshot());
    };

    render() {
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Webcam ref='webcam' audio={false} screenshotFormat='image/jpeg' videoConstraints={this.state.VideoConstants} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' align='center' color='primary' onClick={() => this.captureImage()}>
                            Capture
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
