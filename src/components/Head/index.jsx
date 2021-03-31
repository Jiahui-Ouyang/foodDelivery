import React from "react";
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

const Head = ({
  siteMetadata: {
    description,
    author = "Tanzina Akter",
    siteUrl,
    themeColor,
    image,
    title
  },
}) => {

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>
        {title}
      </title>

      <link rel="canonical" href={siteUrl} />
      {/* <link rel="icon" href={ } type="image/png" /> */}
      {/* <link rel="shortcut icon" href={FavIcon} type="image/png" /> */}
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="theme-color" content={themeColor || "#fff"} />
      <meta name="author" content={author} />

      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

      <meta name="og:url" content={siteUrl} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property="og:image" content={image} />


    </Helmet>
  );
};

Head.propTypes = {
  siteMetadata: PropTypes.shape({
    description: PropTypes.string,  //Meta description
    author: PropTypes.string,       //The creator of the website
    siteUrl: PropTypes.string,      //The canonical url of the page
    themeColor: PropTypes.string,
    image: PropTypes.string,        //The image displayed when the page is shared
    title: PropTypes.string         //The title displayed in the tab section at the top of the page
  }),
};

export default Head;