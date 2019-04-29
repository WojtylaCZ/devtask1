# Development task

## Requirements

- `docker` utility if you want to run the server from a docker image
- `yarn` & `node >= 10.0.0` if you want to run the server from a source code
- Environment variable `PORT`

## Getting started

Getting up and running is as easy as 1, 2, 3.

1. Build the docker image: `docker build -t foo .`
2. Decide how you set/update environment variables. E.g. using `.env file`, flag `-e` with `docker run` command etc.
   A default `PORT` is already set and exposed in the `Dockerfile`, but it can be overwritten.
3. Run the server: `docker run -p XXXX:XXXX foo`

Note: You can use `.env` file as well
(example in `.env-example`) if you like. (Hint: when using docker it is a flag `--env-file .env`)

## Usage

Execute `POST` http request to endpoint `http://HOST:PORT/complexity`. There is required `text` attribute in JSON in body of the request.

```json
{
  "text": " lorem 1 ipsum"
}
```

Execute `POST` http request to endpoint `http://HOST:PORT/complexity?mode=verbose` to get sentence based solution. There is required `text` attribute in JSON in body of the request.

```json
{
  "text": " lorem 1 ipsum"
}
```

## Development

### .env file

You can use .env in the root of the folder for your convenience to setup the environment variables.

### Run from source

```
yarn start
```

```
yarn start:watch
```

### Tests

Run tests:

```
yarn test
```

```
yarn test:watch
```

### Codestyle:

Linter and prettier for codestyle are available. You can run them on your own or they are already setup as pre-commit hooks.

```
yarn lint
```

```
yarn prettier
```

## Assignment

You have been tasked to build an API where a user can query the complexity of a text. In the first iteration your PM asked you to use ​lexical density​. Please use NodeJs + Express (or any of the more well known frameworks) to develop your API.

### Definitions

Lexical density​ is defined as the number of ​lexical words​​ (or content words) divided by the total number of words. In the following sentence the green words are lexical words and the density is 67%.
Kim loves going ​to the ​cinema

For the sake of simplicity, we define a ​lexical word​​ as all words not contained in the
provided list of non lexical words in the Appendix. Case sensitivity should be ignored.
Requirements

- Route: ​​/complexity
  - Description: Return the lexical density of the inputted text. The input text should be
    provided via the request.
  - output :

```
{
    “data”: { overall_ld: 0.42 }
}
```

- Route: ​​/complexity?mode=verbose
  - Description:
    Return the lexical density of the text broken down into sentences. The input
    text should be provided via the request.
  - output :

```
{
    “data”:
    {
    sentence_ld: [ 0.23, 0.1, 1.0, 0.0],
    overall_ld: 0.42
    }
}
```

- Error case:​​ Only texts with up to 100 words or up to 1000 characters are valid input. Please cover these cases with tests using the framework of your choice.
- Storage:​​ The provided ​non-lexical words s​​ hould be stored in a Mongo DB. If time allows, please provide a protected endpoint where new words can be added over time.

- Appendix: Non lexical words
  to, got, is, have, and, although, or, that, when, while, a, either, more, much, neither, my, that, the, as, no, nor, not, at between in, of without, I, you, he, she, it, we, they, anybody, one
