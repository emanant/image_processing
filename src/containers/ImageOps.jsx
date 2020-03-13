import React, { Component } from 'react';
import { Card, CardContent, Container, Grid, Typography, Slider, Box, Button } from '@material-ui/core';
import { Image, Transformation } from 'cloudinary-react';
// CardHeader, CloudinaryContext

export default class ImageOpsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transforms: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, prevState);
    }

    updateColorValue(e, value, key) {
        const transform = {
            key,
            value
        }
        console.log('update color value,key ', value, key);
        const transforms = this.getUpdatedTransform(this.state.transforms, transform);
        this.setState({ transforms })
    }

    getUpdatedTransform(transforms, transform) {
        const newTransforms = transforms.filter(({ key }) => key !== transform.key)
        newTransforms.push(transform);
        return newTransforms;
    }

    getTrasformations() {
        return this.state.transforms.map((transform) => {
            return (
                <Transformation effect={`${transform.key}:${transform.value}`} gravity='center' crop='fill' />
            )
        })
    };

    getRGBCons() {

        return [
            { key: "Red", value: "red", default: 0 },
            { key: "Green", value: "green", default: 0 },
            { key: "Blue", value: "blue", default: 0 }
        ]
    }

    getHSVCons() {

        return [
            { key: "Hue", value: "hue", default: 80 },
            { key: "Saturation", value: "saturation", default: 80 },
            { key: "Value", value: "brightness", default: 80 },
        ]
    }

    getSliderValue(key, type) {
        // console.log('Slider Value'); /////
        const transform = this.state.transforms.find((transform) => transform.key === key);
        console.log("Transforms : stateTransform key value matchtransform: ", this.state.transforms, key, type, transform);
        // console.log("Transforms", this.state.transforms, key, type, transform);
        if (transform) {
            return transform.value;
        }
        if (type === 'rgb') {
            console.log("type rgb");
            return this.getRGBCons().find((transform) => transform.value === key).default
        } else if (type === 'hsv') {
            return this.getHSVCons().find((transform) => transform.value === key).default
        }
    }

    resetFilters(keys) {
        const newTransforms = this.state.transforms.filter(({ key }) => keys.indexOf(key) < 0)
        this.setState({ transforms: newTransforms });
    }

    createRGBEffect(type) {
        const red = { key: 'red', value: 0 }
        const green = { key: 'green', value: 0 }
        const blue = { key: 'blue', value: 0 }
        switch (type) {
            case 'all_red':
                red.value = 100;
                break;
            case 'all_green':
                green.value = 100;
                break;
            case 'all_blue':
                blue.value = 100;
                break;
            default:
                break;
        }
        let { transforms } = this.state;
        transforms = this.getUpdatedTransform(transforms, red)
        transforms = this.getUpdatedTransform(transforms, green)
        transforms = this.getUpdatedTransform(transforms, blue)
        this.setState({ transforms });
    }

    render() {
        return (
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    Input Image
                                </Typography>
                                <Image sign_url='true' publicId='image_app/Leena.png' cloudName='cn-somet' style={{ width: '100%' }} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    Output Image
                                </Typography>
                                {/* <Image publicId='image_app/leena.png' version='1584022936' cloudName='cn-somet' /> */}
                                <Image publicId='image_app/Leena.png' cloudName='cn-somet' style={{ width: '100%' }}>
                                    {this.getTrasformations()}
                                </Image>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Box color='text.primary'>
                                <Typography variant='h5' paragraph={true} align='left' component='h5'>
                                    R-G-B Controls
                                </Typography>
                                {this.getRGBCons().map((color, i) => (
                                    <SliderComponent key={i} getSliderValue={(key) => this.getSliderValue(key, 'rgb')} default={0} min={-100} max={100} keyLabel={color.key} keyValue={color.value}
                                        updateColorValue={(e, value, key) => this.updateColorValue(e, value, key)} />
                                ))}
                                <Button variant='contained' align='left' onClick={() => this.resetFilters(['red', 'green', 'blue'])} color='primary'>
                                    Reset
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card item xs={6}>
                        <CardContent>
                            <Box color='Text.primary'>
                                <Typography paragraph={true} variant='h5' align='left' component='h5'>
                                    R-G-B Based Filters
                                    </Typography>
                                <Button variant='contained' align='left' onClick={() => this.createRGBEffect('all_red')}>
                                    Fill Red
                                    </Button>
                                <Button variant='contained' align='left' onClick={() => this.createRGBEffect('all_green')}>
                                    Fill Green
                                    </Button>
                                <Button variant='contained' align='left' onClick={() => this.createRGBEffect('all_blue')}>
                                    Fill Blue
                                    </Button>
                                <Button variant='contained' align='left' onClick={() => this.resetFilters(['red', 'green', 'blue'])} color='primary'>
                                    Reset
                                    </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Container>

        )
    }

}

class SliderComponent extends Component {
    valueText(value) {
        return `${value}°C`;
    }

    render() {
        console.log("slider value", this.props.getSliderValue(this.props.keyValue));
        return (
            <div>
                <Typography id='discrete-slider' align='left' gutterBottom>
                    {this.props.keyLabel}
                </Typography>
                <Slider
                    defaultValue={this.props.default}
                    getAriaValueText={this.valueText}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    value={this.props.getSliderValue(this.props.keyValue)}
                    marks
                    min={this.props.min}
                    max={this.props.max}
                    onChangeCommitted={(e, value) => this.props.updateColorValue(e, value, this.props.keyValue)} />
            </div>
        )
    }
}