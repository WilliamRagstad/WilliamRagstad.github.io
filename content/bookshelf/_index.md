+++
title = 'My Bookshelf'
date = 2024-01-07T18:16:29+01:00
+++

Here is a list of books I have read, currently reading or have on my to-read list.

- Books I'm currently reading are marked with a <span style="display: inline-block;"> {{< badge >}} reading 📖 {{< /badge >}} </span> badge.
- Books I have read are marked with a <span style="display: inline-block;"> {{< badge >}} read 📚 {{< /badge >}} </span> badge, a rating and my thoughts on it.

All books are broadly categorized by genre with a short description of the book and authors.

## Computer Science

## Software Development

## Science Fiction

<div class="bookshelf">
    <div class="book">
        <div class="cover">
            <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1404613595i/13.jpg" alt="cover"/>
        </div>
        <div class="about">
            <b>The Hitchhiker's Guide to the Galaxy</b><br/>
            <em>by Douglas Adams</em>
            <p>
            A classic science fiction comedy that follows the misadventures of Arthur Dent, an ordinary human who is rescued by Ford Prefect, an alien researcher for the titular guidebook. Together they embark on a journey through space and time, meeting a host of eccentric characters along the way.
            </p>
            <hr/>
            <div class="status">
                <span class="rating">★★★★☆</span>
                <span class="inline-block rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">read 📚</span>
            </div>
        </div>
    </div>
    <div class="comment">
        My first introduction to the series was through the movie adaptation, which I found hilarious. The book is even better, with its witty humor and absurdity. I enjoyed the book immensely and would recommend it to anyone looking for a light-hearted read.
    </div>
</div>

<style>

.bookshelf .book {
    /* display: inline-block;
    margin: 0 16px 16px 0;
    width: 400px; */
    display: flex;
    flex-direction: row;
    margin-bottom: 3em;
}

@media (max-width: 500px) {
    .bookshelf .book {
        flex-direction: column;
    }
}

.bookshelf .book > div {
    /* border: 1px solid #ddd; */
    padding: 8px 16px;
    text-align: center;
}

.bookshelf .book .cover {
    display: flex;
    align-items: center;
}

.bookshelf .book .cover > img {
    margin: 0 auto;
    max-width: 150px;
    max-height: 225px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 1px 5px 8px rgba(0, 0, 0, 0.5);
}

.bookshelf .book .about {
    margin-top: 1em;
}

.bookshelf .book .about > p {
    text-align: justify;
    margin-top: 1em;
    margin-bottom: 0.5em;
}

.bookshelf .book .about > hr {
    margin: 0;
}

.bookshelf .book .about > .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5em;
}

.bookshelf .book .about > .status > .rating {
    font-size: 1.5em;
    line-height: 0;
    color: rgba(var(--color-primary-400),var(--tw-text-opacity));
}

.bookshelf .book .about > .status > .rating::before {
    content: "Rating: ";
    font-size: 0.68em;
    vertical-align: bottom;
    color: var(--tw-prose-body);
}

.bookshelf .comment {
    margin-top: -2.5em;
    margin-bottom: 3em;
    padding: 0.75em 1em;
    border-left: 4px solid rgba(var(--color-primary-400),var(--tw-text-opacity));
    background-color: #c8c8c817;
    border-radius: 4px;
    text-align: justify;
    font-size: 14px;
    line-height: normal;
}

.bookshelf .comment:before {
    content: "Comments";
    font-weight: bold;
    display: block;
    font-size: 16px;
    margin-bottom: 0.4em;
}
</style>
