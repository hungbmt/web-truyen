const path = require("path");
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());
// lấy thông tin subpage
app.get("/v1/:sub/", async (req, res, next) => {
  const { sub } = req.params;
  const page = req.query.page;
  let rangePage = Number(3);
  const url = `https://truyenfull.vn/${sub}/trang-${page}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    const $ = cheerio.load(response.data);
    const genres = [];
    const title = $("h3.title").text();
    const imageBook = $(".book img").attr("src");
    const description = $('*[itemprop="description"]').html();
    const author = $('.info *[itemprop="author"]').text();
    const status =
      $(".info .text-success").text() + $(".info .text-primary").text();
    const source = $(".info .source").text();
    $('.info *[itemprop="genre"]').each((i, elem) => {
      genres.push($(elem).text());
    });

    // Now you can use the cheerio selectors to select the elements you want from the page.
    // For example, to select all chapter links:
    const chapterLinks = [];
    $(".list-chapter li a").each((i, link) => {
      let chapter = $(link).attr("href");
      let namechater = $(link).attr("title");
      chapterLinks.push({
        namechater,
        link: chapter.replace("https://truyenfull.vn", ""),
      });
    });

    // To get the total number of pages, you might do something like this:
    // (This is just an example, you'll need to adjust the selector based on the actual webpage structure)
    // const totalPages = $(".pagination li").last().prev().text();
    const totalPagesElement = $(".pagination li").last().prev().find("a");
    let totalPage;
    if (totalPagesElement.length) {
      const totalPages = totalPagesElement.attr("href");
      let matchResult = totalPages.match(/trang-(\d+)/);
      if (matchResult) {
        totalPage = matchResult[1];
      } else {
        // Xử lý trường hợp không tìm thấy kết quả phù hợp
        totalPage = "";
      }
    } else {
      console.log("Could not find the last page number.");
    }
    res.json({
      title,
      imageBook,
      description,
      author,
      genres,
      source,
      status,
      chapterLinks,
      totalPage,
      rangePage: rangePage,
      currenPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while trying to crawl the page.");
    next(error);
  }
});
// get information chapter
app.get("/v2/:subs/:chapter", async (req, res) => {
  const { subs, chapter } = req.params;
  const url = `https://truyenfull.vn/${subs}/${chapter}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    const $ = cheerio.load(response.data);
    const title = $(".truyen-title").text();
    const nameChapter = $(".chapter-title").text();
    const body = $(".chapter-c").html();
    $(".ads-network.ads-desktop").remove();
    const totalPageElement = $(".btn-chapter-nav");
    const totalPage = totalPageElement.text();

    res.status(200).json({
      title,
      nameChapter,
      body,
    });
  } catch (error) {
    console.log(error);
  }
});
// app.get("/v2/:subs/:chapter", async (req, res) => {
//   const { subs, chapter } = req.params;
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(`https://truyenfull.vn/${subs}/${chapter}`, {
//     timeout: 0,
//   });
//   page.waitForSelector(".chapter_jump");
//   await page.click(".chapter_jump");
//   const content = await page.content();
//   try {
//     const $ = cheerio.load(content);
//     $('style, link[rel="stylesheet"]').remove();
//     const htmlWithoutCss = $.html();
//     await browser.close();

//     res.status(200).json({
//       htmlWithoutCss,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
// get lis truyenfull.vn
// app.get("/danh-sach/:list/", async (req, res) => {
//   const list = req.params.list;
//   const pages = req.query.page;

//   const urlBookHot = `https://truyenfull.vn/danh-sach/${list}/trang-${pages}`;
//   try {
//     const response = await axios.get(urlBookHot, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
//       },
//     });
//     let listBooks = [];
//     let dataImage;
//     let newUrl;
//     let totalPage;

//     const $ = cheerio.load(response.data);
//     // truyện hot
//     $(".row").map((ind, element) => {
//       const imgElement = $(element).find("img").attr("src");
//       const title = $(element).find(".col-xs-7 .truyen-title a").text();
//       const url = $(element).find(".col-xs-7 .truyen-title a").attr("href");
//       const author = $(element).find(".col-xs-7 .author ").text();
//       const totalChap = $(element).find(".col-xs-2 a").text();
//       let linkimgHTML = $(element).find(".col-xs-3 div").html();
//       if (typeof url === "string") {
//         newUrl = url.replace("https://truyenfull.vn/", "/v1/") + "trang-1";
//       }
//       if (typeof linkimgHTML === "string") {
//         let $inner = cheerio.load(linkimgHTML); // Đổi tên biến ở đây
//         dataImage = $inner(".lazyimg").attr("data-image"); // Sử dụng biến mới ở đây
//       }
//       if (title && newUrl && dataImage && author && totalChap) {
//         listBooks.push({ title, newUrl, dataImage, author, totalChap });
//       }
//     });
//     const totalPageElement = $(".pagination li").last().prev().find("a");
//     if (totalPageElement.length) {
//       totalPage = totalPageElement.attr("href");
//     }

//     const totalPages = totalPage.match(/trang-(\d+)/)[1];
//     // Remove null or undefined values
//     listBooks = listBooks.filter((book) => book.title && book.newUrl);
//     // gới hạn array 17
//     // const hotBookscv = listBooks.slice(0, 16);
//     res.json({
//       listBooks,
//       currenpage: pages,
//       totalPages,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

// get home truyenfull.vn

app.get("/v1/:category/:list/", async (req, res) => {
  const { category, list } = req.params;
  const pages = req.query.page;

  const urlBookHot = `https://truyenfull.vn/${category}/${list}/trang-${pages}`;
  try {
    const response = await axios.get(urlBookHot, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    let listBooks = [];
    let dataImage;
    let newUrl;
    let totalPage;

    const $ = cheerio.load(response.data);
    let titleWraper = $(".title-list h2").text();
    $(".row").map((ind, element) => {
      const imgElement = $(element).find("img").attr("src");
      const title = $(element).find(".col-xs-7 .truyen-title a").text();
      const url = $(element).find(".col-xs-7 .truyen-title a").attr("href");
      const author = $(element).find(".col-xs-7 .author ").text();
      const totalChap = $(element).find(".col-xs-2 a").text();
      let linkimgHTML = $(element).find(".col-xs-3 div").html();
      if (typeof url === "string") {
        // newUrl = url.replace("https://truyenfull.vn/", "") + "trang-1";
        newUrl = url.replace("https://truyenfull.vn/", "");
      }
      if (typeof linkimgHTML === "string") {
        let $inner = cheerio.load(linkimgHTML); // Đổi tên biến ở đây
        dataImage = $inner(".lazyimg").attr("data-desk-image"); // Sử dụng biến mới ở đây
      }
      if (title && newUrl && dataImage && author && totalChap) {
        listBooks.push({ title, newUrl, dataImage, author, totalChap });
      }
    });
    const totalPageElement = $(".pagination li").last().prev().find("a");
    if (totalPageElement.length) {
      totalPage = totalPageElement.attr("href");
    }
    // total page
    const totalPages = totalPage.match(/trang-(\d+)/)[1];
    // Remove null or undefined values
    listBooks = listBooks.filter((book) => book.title && book.newUrl);
    res.json({
      titleWraper,
      listBooks,
      currenpage: pages,
      totalPages,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/v1", async (req, res) => {
  const url = "https://truyenfull.vn/";
  try {
    const reps = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    const $ = cheerio.load(reps.data);
    let hotBook = [];
    let newBook = [];
    let BookComplete = [];
    // book Hot
    $("#intro-index .item ").map((inx, itemData) => {
      let Link = $(itemData).find("a").attr("href");
      const imgBook = $(itemData).find("img").attr("src");
      const title = $(itemData).find(".title h3").text();
      if (typeof Link === "string") {
        Link = Link.replace("/chuong-1", "");
      }
      hotBook.push({
        Link: Link.replace("https://truyenfull.vn", ""),
        imgBook,
        title,
      });
    });

    // books new
    $(".list-new .row").map((indx, itemdata) => {
      let genres = [];

      let chapters;
      const title = $(itemdata).find(".col-title h3").text();
      const link = $(itemdata).find(".col-title h3 a").attr("href");
      const chapter = $(itemdata).find(".col-chap").text();
      const LinkChapter = $(itemdata).find(".col-chap a").attr("href");
      const time = $(itemdata).find(".col-time").text();
      // if (typeof link === "string") {
      //   newLink = link.replace("/chuong-1/", "");
      // }
      $(itemdata)
        .find('.col-cat *[itemprop="genre"]')
        .each((indx, element) => {
          let genre = $(element).text();
          let genreObject = {};
          genreObject["genre"] = genre;
          genres.push(genreObject);
        });
      chapters = {
        chapter,
        LinkChapter: LinkChapter.replace("https://truyenfull.vn/", ""),
      };

      newBook.push({
        title,
        link: link.replace("https://truyenfull.vn", ""),
        genres,
        chapters,
        time,
      });
    });
    // book complete

    $(".list-thumbnail .row .col-xs-4").map((indx, dataComplete) => {
      let newLink;
      const title = $(dataComplete).find("a .caption h3").text();
      let imgBook = $(dataComplete).find("a").html();
      let link = $(dataComplete).find("a").attr("href");
      const chapter = $(dataComplete).find("a .caption small").text();
      let daImgComplete;
      if (typeof imgBook === "string") {
        let $inerIm = cheerio.load(imgBook);
        daImgComplete = $inerIm(".lazyimg").attr("data-desk-image");
      }
      if (typeof link === "string") {
        newLink = link.replace("/chuong-1/", "").replace("/chuong-1-1/", "");
      }
      BookComplete.push({
        title,
        link: newLink.replace("https://truyenfull.vn/", ""),
        daImgComplete,
        chapter,
      });
    });

    res.status(200).json({
      message: "success",
      hotBook,
      newBook,
      BookComplete,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
