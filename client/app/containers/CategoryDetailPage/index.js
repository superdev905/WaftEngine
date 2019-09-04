import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { IMAGE_BASE } from 'containers/App/constants';
import * as mapDispatchToProps from './actions';
import { makeSelectBlog, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../components/Loading';
import CategoryListing from '../CategoryListingPage';
import Archives from '../BlogPage/components/Archives';

class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { slug_url },
    } = this.props.match;
    this.props.loadBlogRequest(slug_url);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug_url !== nextProps.match.params.slug_url) {
      this.props.loadBlogRequest(nextProps.match.params.slug_url);
    }
  }
  componentWillUnmount() {
    this.props.clearBlog();
  }

  render() {
    const {
      blog,
      loading,
      match: {
        params: { slug_url },
      },
    } = this.props;
    console.log(blog, 'blog');
    return loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>
            Blog of Category
            {/* {(blog &&
              blog.length > 0 &&
              blog[0].category.find(each => each.slug_url === slug_url)
                .title) ||
              'Blog Not Found'} */}
          </title>
        </Helmet>
        <div className="flex">
          {blog && blog.length > 0 ? (
            <div className="container w-3/4 mx-auto my-10">
              <h2 className="mb-5">
                <span>
                  Blogs related to{' '}
                  {(blog &&
                    blog[0].category.find(each => each.slug_url === slug_url)
                      .title) ||
                    ''}
                </span>
              </h2>

              <div className="flex flex-wrap w-full md:w-3/4 -mx-5">
                {blog &&
                  blog.map(each => {
                    const {
                      image,
                      title,
                      slug_url,
                      description,
                      added_at,
                      category,
                      tags,
                    } = each;

                    return (
                      <div className="blog_sec w-1/2 px-5 mb-5" key={slug_url}>
                        <div className="w-full h-64 object-cover overflow-hidden">
                          <Link to={`/blog/${slug_url}`}>
                            <div className="img blog-img h-full">
                              <img
                                src={image && `${IMAGE_BASE}${image.path}`}
                                className="rounded"
                                alt={`${title}`}
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="">
                          <Link
                            className="text-black no-underline capitalize mb-2 bold block mt-4"
                            to={`/blog/${slug_url}`}
                          >
                            <h2>{title}</h2>
                          </Link>
                          <div className="border-t-1 flex flex-wrap font-bold">
                            <Link
                              className="mr-2 text-black hover:text-waftprimary leading-normal text-base no-underline"
                              to={`/blog-category/${
                                category ? category.slug_url : ''
                              }`}
                            >
                              <div className="mr-2">
                                <span className="text-grey-dark">By</span>{' '}
                                {category ? category.title : ''}{' '}
                              </div>
                            </Link>
                            <p className="text-grey-dark leading-normal text-base mr-2">
                              {moment(added_at).format('MMM Do YY')}
                            </p>
                            <Link
                              className="text-grey-darkleading-normal text-base no-underline"
                              to={`/blog/${slug_url}`}
                            >
                              <div> {(tags && tags.join(', ')) || ''} </div>
                            </Link>{' '}
                          </div>

                          <Link
                            className="text-grey-darker text-base no-underline"
                            to={`/blog/${slug_url}`}
                          >
                            <div
                              className="leading-normal text-base text-left"
                              style={{ height: '95px', overflow: 'hidden' }}
                              dangerouslySetInnerHTML={{ __html: description }}
                            />
                          </Link>

                          <div className="flex justify-end readmore mt-2">
                            {' '}
                            <Link
                              className="no-underline hover:text-waftprimary"
                              to={`/blog/${slug_url}`}
                            >
                              Continue Reading{' '}
                              <span className="rdanim">>>></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div>Blogs Not Found!!</div>
          )}
          <div className="w-1/4 pt-10">
            <h3 className="uppercase">Categories</h3>
            <ul className="list-none pl-0">
              <CategoryListing />
            </ul>
            <br />
            <Archives />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CategoryDetailPage.propTypes = {
  loadBlogRequest: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'categoryDetailPage', reducer });
const withSaga = injectSaga({ key: 'categoryDetailPage', saga });

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CategoryDetailPage);
