import styled from 'styled-components';
import { formatDate } from '../helpers';

const Tweet = styled.div`
    margin: 10px auto;
    padding: 0 10px;
    border: 1px solid #333;
    border-radius: 8px;
`;

const TweetLink = styled.a`
    text-decoration: none;
    color: #333;
`;

const TweetHeader = styled.h4`
    margin-left: 10px;
`;

const TweetBody = styled.p`
    margin-left: 10px;
`;

const TweetDate = styled(TweetBody)`
    font-style: italic;
    color: #999;
`;

const list = (props) => {
    let list = [];
    const username = props.username;

    props.tweets.forEach(tweet => {
        list.push(
            <Tweet key={tweet.id}>
                <TweetLink target="_blank" href={`https://twitter.com/${username}/status/${tweet.id}`}>
                <TweetHeader>{props.username}</TweetHeader>
                <TweetBody>{tweet.text}</TweetBody>  
                <TweetDate>{formatDate(tweet.created_at)}</TweetDate>
                </TweetLink>                
            </Tweet>
        )
    });

    return list;
}


export default list;