import React from "react";
import styles from "./style";

import { WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { OptionsObject } from "notistack";
import { withRouter, NextRouter } from "next/dist/client/router";
import Head from "next/head";

import FrontendRequestObservable from "../../model/FrontendRequestObservable";
import { POST_THREAD_SEARCH } from "../../consts/backend";
import UserPostList from "../../components/UserPostList";
import { ISearchItem, ISearchResponse } from "../../typings";
import { TITLE_PREFIX } from "../../consts";
import { SEARCH_RAW, SEARCH } from "../../consts/routers";

interface Props extends WithStyles {
    router: NextRouter;

    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

class Search extends React.PureComponent<Props> {
    state = {
        resultList: [] as Array<ISearchItem>,
        page: 1,
        total: 0,
        keywords: "",
        searchBoxInput: ""
    };

    fetchData = async (keywords: string, page: string) => {
        const {
            data: { code, message }
        } = await FrontendRequestObservable({
            url: POST_THREAD_SEARCH(page),
            method: "POST",
            data: {
                keywords
            }
        }).toPromise();

        if (code === 200) {
            const { list, count } = message as ISearchResponse;
            this.setState({
                resultList: list,
                total: count,
                searchBoxInput: keywords
            });
        } else {
            const { enqueueSnackbar } = this.props;
            enqueueSnackbar(message, { variant: "error" });
        }
    };

    componentDidMount() {
        const { router } = this.props;

        const keywords = router.query["keywords"] as string;
        const pageRaw = router.query["page"] as string;
        const page = Number.parseInt(pageRaw);

        this.setState({
            keywords,
            page
        });
        this.fetchData(keywords, pageRaw);
    }

    handlePageChange = (page: number) => {
        const { keywords } = this.state;
        const { router } = this.props;
        const url = SEARCH_RAW;
        const as = SEARCH(keywords, page.toString());

        router.push(url, as, { shallow: true });
        this.setState({
            page
        });
        this.fetchData(keywords, page.toString());
    };
    handleSearch = () => {
        const { searchBoxInput } = this.state;
        this.setState({
            keywords: searchBoxInput,
            page: 1
        });

        const { router } = this.props;
        const url = SEARCH_RAW;
        const as = SEARCH(searchBoxInput, "1");
        router.push(url, as, { shallow: true });
        this.fetchData(searchBoxInput, "1");
    };
    handleSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.keyCode === 13) {
            this.handleSearch();
        }
    };
    handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            searchBoxInput: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        const { resultList, page, total, searchBoxInput } = this.state;
        const postList: Array<ISearchItem> = resultList.map(item => ({
            ...item,
            thread: {
                user: {
                    username: item.username,
                    uid: item.uid,
                    ...item.thread.user
                },
                ...item.thread
            }
        }));
        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}搜索</title>
                </Head>
                <Paper className={classes["search-input-container"]}>
                    <InputBase
                        className={classes.input}
                        placeholder="搜索..."
                        onChange={this.handleSearchInputChange}
                        onKeyDown={this.handleSearchInputKeyDown}
                        value={searchBoxInput}
                    />
                    <IconButton className={classes.iconButton} aria-label="search" onClick={this.handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Paper className={classes.root}>
                    <UserPostList page={page} total={total} onPageChange={this.handlePageChange} postList={postList} />
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Search));
