import React, {
  memo,
  useEffect,
  useState,
  createElement,
  useCallback,
} from "react";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  changeCurrentCommentTotal,
  getHotCommentAction,
} from "../../store/actionCreator";
import { changeIsVisible } from "@/components/login/store/actionCreator";

// 其他组件
import { Comment, Tooltip, Avatar, message } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import CommentHeadline from "@/components/comment-headline";
import CommentInput from "@/components/comment-input";
import Pagination from "@/components/pagination";

// 从服务端请求数据
import {
  getSongComments,
  handleSongComment,
  likeComment,
} from "@/api/api/comment";

// 其他函数
import { getPlayCount } from "@/utils/handle-song";

import { SoNewWrapper, SongCommentWrapper, WonderfulWrapper } from "./style";

function SongComment() {
  const [songComment, setSongComment] = useState([]); // 用于评论、
  const [total, setTotal] = useState(0); // 用于评论数
  const [flag, setFlag] = useState(false); // 点赞开关
  const [liked, setLiked] = useState([]); // 歌曲的点赞状态
  const [currentPage, setCurrentPage] = useState(1); // 用于分页

  // redux hook
  const dispatch = useDispatch();

  const { hotComments, currentSongId, isLogin, cookie, avatarUrl } =
    useSelector(
      (state) => ({
        hotComments: state.getIn(["songPlayer", "hotComments"]),
        currentSongId: state.getIn(["songPlayer", "currentSong", "id"]),
        isLogin: state.getIn(["loginState", "isLogin"]),
        cookie: state.getIn(["loginState", "cookie"]),
        avatarUrl: state.getIn(["loginState", "profile", "avatarUrl"]),
      }),
      shallowEqual
    );

  // other hooks
  useEffect(() => {
    dispatch(getHotCommentAction(currentSongId)); // 获取当前歌曲的最热评论（会存储在 store 的全局 state）
    // 获取当前歌曲的评论 => 在组件内的 state 记录当前歌曲的评论和评论数 => 更改当前歌曲的评论数（会存储在 store 的全局 state）
    getSongComments(currentSongId).then((res) => {
      setSongComment(res.comments);
      setTotal(res.total);
      dispatch(changeCurrentCommentTotal(res.total));
    });
  }, [dispatch, currentSongId]);

  // other handle
  function formatDate(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加 8 小时
    return date.toJSON().substr(0, 19).replace("T", " ");
  }

  // 点赞评论
  const setLikeComment = (index, data) => {
    if (!isLogin) {
      dispatch(changeIsVisible(true));
    }
    if (!flag) {
      liked[index].liked = true;
      liked[index].count += 1;
      setLiked(liked);
      // 调点赞接口
      likeComment(currentSongId, data.commentId, 1, cookie).then((res) => {
        console.log("res :>>>", res);
        if (res.code === 200) message.success("点赞成功");
        else message.success("请稍后再试");
      });
    } else {
      liked[index].liked = false;
      liked[index].count -= 1;
      setLiked(liked);
      // setFlag(true)
      // 调取消点赞接口
      likeComment(data.commentId, 0, cookie).then((res) => {
        if (res.code === 200) message.success("取消点赞成功");
        else message.success("取消点赞成功");
      });
    }
    setFlag(!flag);
  };

  // 分页
  const changePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage);
      // offset = (当前页数 - 1) * limit
      const targePageCount = (currentPage - 1) * 20;
      getSongComments(currentSongId, 20, targePageCount).then((res) => {
        setSongComment(res.comments);
        setTotal(res.total);
      });
    },
    [currentSongId]
  );

  // template html action
  // 点赞 HTML
  const getLikeTemplateAction = (item, index) => {
    liked.push({
      liked: item.liked,
      count: item.likedCount,
    });
    return [
      <Tooltip key="comment-basic-like" title="Like" className="comment-like">
        <span onClick={() => setLikeComment(index, item)}>
          {createElement(
            liked[index].liked === true ? LikeFilled : LikeOutlined
          )}
          <span className="comment-action">
            {getPlayCount(liked[index].count)}
          </span>
        </span>
      </Tooltip>,
    ];
  };

  // 评论歌曲校验 (获取焦点)
  const commentSongcheckout = () => {
    if (!isLogin) dispatch(changeIsVisible(true));
  };

  // 评论成功
  const commentCallbackOk = (value) => {
    handleSongComment(currentSongId, value, cookie).then((res) => {
      if (res.code === 200)
        message.success("评论成功").then(() => {
          getSongComments(currentSongId).then((res) => {
            setSongComment(res.comments);
            setTotal(res.total);
          });
        });
    });
  };

  return (
    <SongCommentWrapper>
      <CommentHeadline title="评论" />
      {/* 评论内容 */}
      <CommentInput
        onFocus={() => commentSongcheckout()}
        callbackOk={(value) => commentCallbackOk(value)}
        isLogin={isLogin}
        photo={avatarUrl}
      />
      {/* 精彩评论 */}
      <WonderfulWrapper>
        <div className="header-comment">精彩评论</div>
        {hotComments &&
          hotComments.map((item, index) => {
            return (
              <Comment
                key={item.commentId}
                author={item.user.nickname}
                avatar={<Avatar src={item.user.avatarUrl} alt="Han Solo" />}
                content={<p>{item.content}</p>}
                datetime={
                  <Tooltip title={formatDate(item.time)}>
                    {formatDate(item.time).slice(
                      0,
                      formatDate(item.time).indexOf(" ")
                    )}
                  </Tooltip>
                }
              />
            );
          })}
      </WonderfulWrapper>
      {/* 最新评论 */}
      <SoNewWrapper>
        <div className="header-comment">最新评论</div>
        {songComment &&
          songComment.map((item, index) => {
            return (
              <Comment
                actions={getLikeTemplateAction(item, index)}
                key={item.commentId}
                author={item.user.nickname}
                avatar={<Avatar src={item.user.avatarUrl} alt="Han Solo" />}
                content={<p>{item.content}</p>}
                datetime={
                  <Tooltip title={formatDate(item.time)}>
                    {formatDate(item.time).slice(0, formatDate(item.time))}
                  </Tooltip>
                }
              />
            );
          })}
      </SoNewWrapper>
      {/* 分页 */}
      <Pagination
        currentPage={currentPage}
        pageSize={20}
        total={total}
        onPageChange={(currentPage) => changePage(currentPage)}
      />
    </SongCommentWrapper>
  );
}

export default memo(SongComment);
