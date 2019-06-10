/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MediaElement from '../../../components/MediaElement';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectMedia } from '../selectors';
import * as mapDispatchToProps from '../actions';
import { IMAGE_BASE } from '../../App/constants';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import BackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
  modal: { backgroundColor: '#fff', padding: '20' },
  media: {
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    marginRight: '20px',
    marginBottom: '20px',
    borderRadius: '6px',
    background: '#f0f0f0',
    display: 'inline-block',
    '& > img': { maxWidth: '100%' },
  },
});
const SortableImageItem = SortableElement(({value, index, _this}) => <div class="flex mb-4 bg-grey-lighter p-2">
  <div className="w-2/5 m-auto text-center pr-5">
    {value.image ? (
      <img className="rounded w-full"
        src={`${IMAGE_BASE}public/300-300/media/${
          value.image.filename
        }`}
      />
    ) : (
<button class="bg-grey-light py-2 px-4 rounded text-grey-darker hover:bg-grey-lightest border"
 onClick={_this.handleSetImage(index)}
>
  Click To Set Image</button>
    )}</div>


<div className="w-2/5 m-auto text-center"><input class="Waftinputbox" id={`slider-caption-${index}`} type="text" value= {value.caption} placeholder="Caption"
                    onChange={_this.handleImageCaptionChange(index)} style={{background:'#FFF',height:'100%'}}/></div>
                    <div className="w-1/5 m-auto text-center">
    <IconButton
      color="secondary"
      onClick={() => _this.handleRemoveSlide(index)}
    >
      <DeleteIcon />
    </IconButton>
    </div>
  </div>
  );

const SortableImageList = SortableContainer(({items, _this}) => {
  return (
    <div className="rounded mt-4">
      {items.map((value, index) => (
        <SortableImageItem key={`${value._id}-item-image-${index}`} index={index} value={value} _this={_this}/>
      ))}
    </div>
  );
});
class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    loadMediaRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    media: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = { open: false, index: -1, subheader: 'Slider Add'};

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
      this.setState({ subheader: 'Slider Edit' });
    }
    this.props.loadMediaRequest();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleImageCaptionChange = index => event => {
    event.persist();
    const tempImages = [...this.props.one.images];
    tempImages[index].caption = event.target.value;
    this.props.setOneValue({ key: 'images', value: tempImages });
  };

  handleImageImageChange = id => {
    const tempImages = [...this.props.one.images];
    tempImages[this.state.index].image = id;
    this.props.setOneValue({ key: 'images', value: tempImages });
    this.setState({ open: false, index: -1 });
  };

  handleAddSlide = () => {
    const tempImages = [...this.props.one.images];
    const newSlide = { image: '', caption: '' };
    this.props.setOneValue({
      key: 'images',
      value: [newSlide, ...tempImages],
    });
  };

  handleRemoveSlide = index => {
    const tempImages = [...this.props.one.images];
    this.props.setOneValue({
      key: 'images',
      value: [...tempImages.slice(0, index), ...tempImages.slice(index + 1)],
    });
  };

  handleSetImage = index => () => {
    this.setState({ open: true, index });
  };

  handleGoBack = () => {
    this.props.push('/admin/slider-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleImagePagination = query => {
    this.props.loadMediaRequest(query);
  };

  onImageSortEnd = ({oldIndex, newIndex}) => {
    this.props.setOneValue({ key: 'images', value: arrayMove(this.props.one.images, oldIndex, newIndex)})
  };
  render() {
    const { one, classes, media } = this.props;
    const { subheader } = this.state;

    // media next prev logic
    const lastPage = Math.ceil(media.totaldata / media.size);
    const firstPage = 1;
    const isFirstPage = media.page === firstPage;
    const isLastPage = media.page === lastPage;
    return (
      <>
         <div class="flex justify-between mt-1 mb-1">
        <PageHeader>
        <IconButton className="cursor-pointer"	 onClick={this.handleGoBack} aria-label="Back">
          <BackIcon />
        </IconButton></PageHeader>
        </div>
        <Dialog
          className={classes.modal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
              marginBottom: '20px',
            }}
          >
            <DialogTitle id="htmlForm-dialog-title">Select Media</DialogTitle>
            <div>
              {' '}
              {!isFirstPage && (
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    this.handleImagePagination({ page: media.page - 1 })
                  }
                >
                  Prev
                </Button>
              )}
              {!isLastPage && (
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    this.handleImagePagination({ page: media.page + 1 })
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </div>
          <DialogContent>
            {media.data.map(each => (
              <div
                key={each._id}
                className={classes.media}
                onClick={() => this.handleImageImageChange(each._id)}
              >
                <img src={`${IMAGE_BASE}${each.path}`} alt={each.caption} />
              </div>
            ))}
          </DialogContent>
        </Dialog>
        <PageContent>
            <div class="w-full md:w-1/2 pb-4">
      <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2" for="grid-last-name">
      Slider Name
      </label>
      <input class="Waftinputbox" id="slider-name" type="text" value= {one.slider_name} name="slider_name"
                    onChange= {this.handleChange('slider_name')} />
    </div>

    <div class="w-full md:w-1/2 pb-4">
      <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2" for="grid-last-name">
      Slider Key
      </label>
      <input class="Waftinputbox" id="slider-key" type="text" value= {one.slider_key} name="slider_key"
                    onChange= {this.handleChange('slider_key')} />
    </div>
              
    <div class="w-full md:w-1/2 pb-4">
      <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2" for="grid-last-name">
      Slider Settings
      </label>
                <textarea
                  name="slider settings"
                  id="slider_setting"
                  className="Waftinputbox"
                  cols="50"
                  rows="8"
                  onChange={this.handleChange('settings')}
                  value={one.settings || ''}
                />
              </div>
              <button class="text-white py-2 px-4 rounded btn-waft"
              onClick={this.handleAddSlide}
              >
                Add Slide</button>
              <div
             >
                <SortableImageList items={one.images} _this={this} onSortEnd={this.onImageSortEnd}/>
              </div>

            
              <button class="text-white py-2 px-4 rounded mt-4 btn-waft"
              onClick={this.handleSave}
              >
                Save</button>
         </PageContent>
      </>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'sliderManagePage', reducer });
const withSaga = injectSaga({ key: 'sliderManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  media: makeSelectMedia(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
