// Reviewed source examples. Text is localized at build time; code is never translated.
const lesson=(level,id,text,code,reference)=>({level,id,text,code,reference});
export const curriculum={
  html:[
    lesson('intermediate','accessible-forms',{
      title:'Accessible forms and validation', prerequisites:'Labels, input types, form submission.', environment:'HTML5; a server endpoint is required to process submission.',
      explanation:'A form needs a usable keyboard path, explicit labels and error messages associated with their fields. Native constraints help users correct input before submitting. Keep the form usable without JavaScript, and repeat validation on the server because browser validation can be bypassed.',
      pitfall:'A placeholder does not replace a label. Do not communicate errors using color alone. Add aria-invalid only when a field has actually failed validation.',
      task:'Build a registration form with an email field and a required consent checkbox. Show how a server validation error is associated with the email field.',
      criteria:['Tab reaches every control in a logical order; Space toggles consent.','An empty or malformed email is rejected by native validation.','The server error is visible, linked with aria-describedby, and aria-invalid is set only on failure.'],
      hint:'Use label/for pairs and give each help or error message a stable id.'
    },`<form action="/register" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required
         autocomplete="email" aria-describedby="email-help">
  <p id="email-help">Use an address you can access.</p>
  <label><input type="checkbox" name="consent" required> I agree</label>
  <button type="submit">Register</button>
</form>
<!-- On a rejected submission, the server can render:
  aria-invalid="true" aria-describedby="email-help email-error"
  <p id="email-error">This address is already registered.</p>
-->`, 'https://www.w3.org/WAI/tutorials/forms/'),
    lesson('professional','image-delivery',{
      title:'Responsive images and loading budgets', prerequisites:'Semantic HTML, responsive layout, browser Network tools.', environment:'Modern browser; provide the image files used in the example.',
      explanation:'Image delivery depends on the rendered slot width and device pixel ratio. Describe candidate widths using srcset and the actual layout using sizes. Reserve the aspect ratio before download to reduce layout movement. A likely hero image should load eagerly; off-screen images can be lazy-loaded.',
      pitfall:'Incorrect sizes can download oversized images. Do not mark every image high priority. Browser caching and device pixel ratio affect which candidate is selected.',
      task:'Create a hero image with three width candidates and a lazy-loaded gallery image. Verify the chosen candidate, transfer size and layout stability at narrow and wide viewports.',
      criteria:['width and height reserve the correct aspect ratio before images load.','At 390px and 1200px, the selected candidate is appropriate for the slot and device pixel ratio.','The hero is not lazy-loaded; off-screen gallery images are lazy-loaded.'],
      hint:'Inspect currentSrc and the Network panel with cache disabled; compare actual slot width with sizes.'
    },`<img src="hero-960.jpg"
     srcset="hero-480.jpg 480w, hero-960.jpg 960w, hero-1440.jpg 1440w"
     sizes="(max-width: 720px) calc(100vw - 24px), 960px"
     width="1440" height="810" fetchpriority="high"
     alt="A developer reviewing a performance trace">
<img src="gallery-640.jpg" width="640" height="480"
     loading="lazy" decoding="async" alt="The completed project">`, 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images')
  ],
  css:[
    lesson('intermediate','container-layout',{
      title:'Components that respond to their container', prerequisites:'Grid, media queries, the box model.', environment:'A browser supporting CSS container queries.',
      explanation:'A reusable component may be narrow inside a sidebar even on a wide screen. Container queries react to its available inline size instead of the viewport. Put containment on a wrapper and query a descendant. Start with a useful single-column fallback, then enhance the layout.',
      pitfall:'An element cannot use a size query to query itself. Avoid fixed minimum widths that overflow a narrow container.',
      task:'Place the same product card in a sidebar and in a wide content area. Switch from one column to two when the wrapper is at least 32rem wide.',
      criteria:['The narrow card has one column without horizontal overflow.','The wide card has two columns even when both cards share the same viewport.','Disabling container-query support leaves a readable single-column card.'],hint:'Use container-type: inline-size on the wrapper, not on the card being restyled.'
    },`.card-host { container-type: inline-size; }
.product-card { display: grid; gap: 1rem; }
.product-card > * { min-width: 0; }
.product-card img { max-width: 100%; height: auto; }
@container (min-width: 32rem) {
  .product-card { grid-template-columns: 1fr 2fr; }
}
/* <div class="card-host"><article class="product-card">...</article></div> */`, 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries'),
    lesson('professional','cascade-contract',{
      title:'Cascade layers as an override contract', prerequisites:'Specificity, inheritance, custom properties.', environment:'A browser supporting @layer and :where().',
      explanation:'Declare layer order before rules so components have a predictable override contract. For normal declarations, a later layer outranks an earlier layer before specificity is compared. Keep low-specificity component selectors and explicit design tokens so consumers can override them without escalating selector weight.',
      pitfall:'Normal unlayered author rules outrank normal layered rules. Important declarations reverse layer precedence; do not treat layers as a replacement for understanding the cascade.',
      task:'Create a button component and a theme override in separate layers. Verify that the theme wins despite a more specific selector in the component layer, and document the effect of an unlayered rule.',
      criteria:['Changing the theme token updates the button without editing the component.','The later normal layer wins independently of selector specificity.','The review explains unlayered rules and the reversed precedence of !important.'],hint:'Use the Computed panel to identify the winning declaration, not just the last matching selector.'
    },`@layer base, components, theme;
@layer base { :root { --action-bg: #222; } }
@layer components {
  .toolbar .button { background: var(--action-bg); color: white; }
  :where(.button) { padding: .6rem 1rem; border: 0; }
}
@layer theme {
  .button { --action-bg: #174ea6; background: var(--action-bg); }
}
/* Adding .button { background: red; } outside a layer would win
   against these normal layered declarations. */`, 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade')
  ],
  javascript:[
    lesson('intermediate','partial-results',{
      title:'Async batches with partial failures', prerequisites:'Promises, async/await, arrays and error handling.', environment:'Modern JavaScript or Node.js 18+.',
      explanation:'Promise.all rejects when one input rejects, which is useful for an all-or-nothing result. Promise.allSettled records the outcome of every operation in input order. Normalize each outcome into a result object so the caller can distinguish a failed request from a successful empty value.',
      pitfall:'Starting every job at once is not a concurrency limit. Use this pattern for small bounded batches; a large stream of jobs needs a worker pool or another limit.',
      task:'Implement collectResults(jobs), where jobs is an array of async functions. Return one result object per job, preserving order and retaining failures.',
      criteria:['A resolved value becomes {ok:true,value}.','A rejection becomes {ok:false,error} without discarding successful siblings.','An empty batch returns []; a synchronously throwing job is also recorded as a failure.'],hint:'Wrap each function call in Promise.resolve().then(job) so synchronous exceptions become rejections.'
    },`async function collectResults(jobs) {
  const settled = await Promise.allSettled(
    jobs.map(job => Promise.resolve().then(job))
  );
  return settled.map(result => result.status === "fulfilled"
    ? { ok: true, value: result.value }
    : { ok: false, error: String(result.reason) });
}`, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled'),
    lesson('professional','latest-request',{
      title:'Cancellation and stale-response races', prerequisites:'Async functions, HTTP failures, dependency injection.', environment:'Modern browser or Node.js 18+ with AbortController.',
      explanation:'When a user changes a search query, an older response can arrive after a newer one. Abort the previous request to reduce wasted work and also track a generation number to prevent stale commits. These solve different problems: a transport can ignore cancellation or finish just before it.',
      pitfall:'Abort is not a server-side rollback. Check response.ok because fetch resolves for HTTP errors. Only the latest operation may report a result or an error to the view.',
      task:'Create a latest-only loader with injected fetch, result and error callbacks. A slow old request must never replace a newer result, even when the fake transport ignores abort.',
      criteria:['Resolve the second request before the first: only the second value is committed.','A non-OK response reaches onError only if it is still the latest request.','An aborted operation produces no visible error; callbacks from stale operations are ignored.'],hint:'Capture a per-request controller and generation value before awaiting the transport.'
    },`function createLatestLoader(fetcher, onValue, onError) {
  let generation = 0;
  let active;
  return async function load(url) {
    active?.abort();
    const controller = new AbortController();
    active = controller;
    const current = ++generation;
    try {
      const response = await fetcher(url, { signal: controller.signal });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const value = await response.json();
      if (current === generation) onValue(value);
    } catch (error) {
      if (current === generation && !controller.signal.aborted) onError(error);
    }
  };
}`, 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController')
  ],
  python:[
    lesson('intermediate','streaming-records',{
      title:'Streaming records with explicit validation', prerequisites:'Generators, dictionaries, exceptions, file objects.', environment:'Python 3.10+; standard library only.',
      explanation:'A generator can validate and yield records one at a time instead of loading an entire file into a list. Keep parsing separate from aggregation so each can be tested independently. Include the line number in failures; this makes a malformed export actionable instead of producing an unexplained total.',
      pitfall:'bool is a subclass of int in Python. When a data contract requires an actual integer, isinstance(value, int) alone also accepts true and false.',
      task:'Read newline-delimited JSON records and yield nonnegative integer amounts. Skip blank lines, reject missing or invalid amounts, and report the offending line number.',
      criteria:['Valid records yield amounts in order without building an intermediate list.','Boolean, negative and missing amounts raise ValueError containing the line number.','Malformed JSON is wrapped with line context; blank input yields no values.'],hint:'Use enumerate(lines, 1), json.loads and type(value) is int for this contract.'
    },`import json

def amounts(lines):
    for line_number, line in enumerate(lines, 1):
        if not line.strip():
            continue
        try:
            record = json.loads(line)
            value = record.get("amount") if isinstance(record, dict) else None
            if type(value) is not int or value < 0:
                raise ValueError("amount must be a nonnegative integer")
        except (ValueError, TypeError) as error:
            raise ValueError(f"line {line_number}: {error}") from error
        yield value`, 'https://docs.python.org/3/howto/functional.html#generators'),
    lesson('professional','bounded-futures',{
      title:'Bounded submission and failure-aware concurrency', prerequisites:'Iterators, futures, I/O versus CPU workloads.', environment:'Python 3.10+; the worker function must be safe to call from threads.',
      explanation:'A fixed worker count limits running threads, but submitting every item can still create an unbounded queue of futures. Keep a bounded set of in-flight jobs and refill it as jobs finish. Read each future result so exceptions propagate. Use this for I/O-bound work; CPU-heavy work may need processes.',
      pitfall:'Cancelling a future does not interrupt a running thread. This generator cancels pending jobs on exit, but executor shutdown still waits for running jobs; the worker must enforce its own I/O timeouts.',
      task:'Implement bounded_map(fn, items, limit) with at most limit submitted jobs. Yield completion-order results and cancel pending jobs when a worker fails or iteration stops.',
      criteria:['Instrument submitted jobs and verify the in-flight count never exceeds limit.','A worker failure is raised to the caller; pending jobs are cancelled.','Empty input terminates; limit below one raises ValueError; running workers use timeouts.'],hint:'Wait for FIRST_COMPLETED, pop completed futures and then refill from the iterator.'
    },`from concurrent.futures import ThreadPoolExecutor, wait, FIRST_COMPLETED

def bounded_map(fn, items, limit=4):
    if limit < 1:
        raise ValueError("limit must be positive")
    source = iter(items)
    pending = set()
    with ThreadPoolExecutor(max_workers=limit) as pool:
        try:
            exhausted = False
            while pending or not exhausted:
                while len(pending) < limit and not exhausted:
                    try:
                        item = next(source)
                    except StopIteration:
                        exhausted = True
                    else:
                        pending.add(pool.submit(fn, item))
                if not pending:
                    break
                done, pending = wait(pending, return_when=FIRST_COMPLETED)
                for future in done:
                    yield future.result()
        finally:
            for future in pending:
                future.cancel()`, 'https://docs.python.org/3/library/concurrent.futures.html')
  ],
  csharp:[
    lesson('intermediate','linq-materialization',{
      title:'LINQ, deferred execution and snapshots', prerequisites:'Collections, lambdas, IEnumerable.', environment:'.NET 6+; console application.',
      explanation:'Most LINQ operators describe a computation that runs when you enumerate it. If the source changes, a later enumeration can produce a different result. Materialize once when you need a stable snapshot, and distinguish that deliberate allocation from repeatedly enumerating an expensive source.',
      pitfall:'ToList copies the sequence of references, not the mutable objects they refer to. A snapshot of object references is not a deep copy.',
      task:'Create a deferred query and a materialized snapshot of even numbers. Change the source and demonstrate the different results.',
      criteria:['Before mutation, both sequences contain 2 and 4.','After adding 6, the deferred query includes 6 while the snapshot remains unchanged.','The explanation identifies when enumeration and allocation occur.'],hint:'Call ToList before changing the input list.'
    },`using System;
using System.Collections.Generic;
using System.Linq;

var numbers = new List<int> { 1, 2, 3, 4 };
var query = numbers.Where(n => n % 2 == 0);
var snapshot = query.ToList();
numbers.Add(6);
Console.WriteLine(string.Join(",", query));    // 2,4,6
Console.WriteLine(string.Join(",", snapshot)); // 2,4`, 'https://learn.microsoft.com/en-us/dotnet/standard/linq/deferred-execution-lazy-evaluation'),
    lesson('professional','parallel-cancellation',{
      title:'Bounded async I/O and cancellation', prerequisites:'Task, CancellationToken, HttpClient and disposal.', environment:'.NET 6+; reuse an injected HttpClient.',
      explanation:'Bound concurrency at the operation boundary instead of creating one task for every URL. Parallel.ForEachAsync combines a maximum degree of parallelism with cooperative cancellation. Pass its token to the actual I/O call and dispose every response. Keep transport configuration outside the worker so tests can inject a fake handler.',
      pitfall:'Cancellation stops future work cooperatively; it cannot undo completed HTTP requests. Configure timeouts on the injected client and avoid automatically retrying non-idempotent operations.',
      task:'Check a collection of URLs with no more than four concurrent requests. Surface unsuccessful HTTP responses and honor cancellation.',
      criteria:['A fake HTTP handler records at most four concurrent requests.','Cancellation reaches SendAsync and prevents the batch from continuing normally.','Every response is disposed, and an HTTP failure makes the returned task fail.'],hint:'Use ResponseHeadersRead when you only need status, and call EnsureSuccessStatusCode.'
    },`using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

static Task CheckAsync(IEnumerable<Uri> urls, HttpClient client,
                       CancellationToken token) =>
    Parallel.ForEachAsync(urls, new ParallelOptions {
        MaxDegreeOfParallelism = 4,
        CancellationToken = token
    }, async (url, ct) => {
        using var response = await client.GetAsync(
            url, HttpCompletionOption.ResponseHeadersRead, ct);
        response.EnsureSuccessStatusCode();
    });`, 'https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.parallel.foreachasync')
  ],
  cpp:[
    lesson('intermediate','ownership-raii',{
      title:'Ownership and exception-safe resource lifetime', prerequisites:'Classes, constructors, exceptions and references.', environment:'C++17 or newer.',
      explanation:'Bind a resource lifetime to an object so scope exit releases it on both success and exception paths. Standard containers and smart pointers encode ownership directly. Prefer returning values or owning objects over handing callers a raw pointer whose deletion policy is undocumented.',
      pitfall:'A raw pointer or reference obtained from an owning object is still only a borrow. It becomes invalid when the owner is destroyed or moves its resource elsewhere.',
      task:'Read whitespace-separated integers from a file into a vector. Report opening and parsing failures while allowing the file stream to close automatically.',
      criteria:['A valid file yields all integers in order; an empty file yields an empty vector.','An inaccessible path throws an exception.','A malformed token throws instead of returning a misleading partial success.'],hint:'After extraction stops, distinguish end-of-file from another stream failure.'
    },`#include <charconv>
#include <fstream>
#include <stdexcept>
#include <string>
#include <vector>

std::vector<int> read_numbers(const std::string& path) {
    std::ifstream input(path);
    if (!input) throw std::runtime_error("cannot open file");
    std::vector<int> values;
    std::string token;
    while (input >> token) {
        int value;
        const auto [end, error] = std::from_chars(
            token.data(), token.data() + token.size(), value);
        if (error != std::errc{} || end != token.data() + token.size())
            throw std::runtime_error("invalid integer");
        values.push_back(value);
    }
    if (input.bad()) throw std::runtime_error("file read failed");
    return values;
}`, 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rr-raii'),
    lesson('professional','strong-exception-guarantee',{
      title:'Transactional updates and the strong exception guarantee', prerequisites:'RAII, move semantics, standard-container guarantees.', environment:'C++17; std::vector<int> with its default allocator.',
      explanation:'A multi-step update can leave state half modified if allocation or copying throws. Prepare the complete next state in a temporary object, then commit with a non-throwing operation. This gives a strong guarantee: success applies the whole change; failure leaves the original unchanged. The cost is temporary memory and copying.',
      pitfall:'The commit operation must actually be non-throwing under the chosen allocator and type. Do not generalize a guarantee for vector<int> to arbitrary user-defined containers without checking their contracts.',
      task:'Append a batch atomically to a vector<int>: build a temporary copy, extend it, and commit with swap. Document the memory cost and guarantee.',
      criteria:['Normal and empty batches produce the expected values.','Self-append is well defined because the source remains intact until commit.','A fault-injection or allocator-based test demonstrates that failure before swap preserves the original.'],hint:'Perform every potentially throwing operation on the temporary state.'
    },`#include <vector>

void append_atomically(std::vector<int>& target,
                       const std::vector<int>& batch) {
    auto next = target;
    next.insert(next.end(), batch.begin(), batch.end());
    target.swap(next);
}
// Time and extra memory: O(target.size() + batch.size()).
// The default allocator makes this vector swap non-throwing.`, 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Re-exception')
  ],
  java:[
    lesson('intermediate','stream-lifetime',{
      title:'Lazy file streams and resource ownership', prerequisites:'Streams, lambdas, checked exceptions.', environment:'Java 17+; UTF-8 text files.',
      explanation:'A stream returned by Files.lines owns an open file resource and must be closed. Use try-with-resources around the terminal operation. Keep parsing rules explicit: trimming and ignoring blank lines are separate choices from accepting malformed numbers.',
      pitfall:'Returning a lazy stream from inside a closed try block gives the caller an unusable resource. Either consume it before closing or transfer an explicit close obligation to the caller.',
      task:'Sum nonblank integer lines from a UTF-8 file using try-with-resources. Reject malformed values and detect overflow instead of silently wrapping.',
      criteria:['Blank lines are ignored and signed integers are accepted.','Invalid integers fail rather than being replaced by zero.','The stream closes on success and failure; arithmetic overflow is reported.'],hint:'Use reduce(0L, Math::addExact) after mapping lines to long values.'
    },`import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

final class Totals {
  static long sum(Path path) throws IOException {
    try (var lines = Files.lines(path, StandardCharsets.UTF_8)) {
      return lines.map(String::trim)
          .filter(line -> !line.isEmpty())
          .mapToLong(Long::parseLong)
          .reduce(0L, Math::addExact);
    }
  }
}`, 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Files.html#lines(java.nio.file.Path,java.nio.charset.Charset)'),
    lesson('professional','bounded-executor',{
      title:'Bounded executors and overload policy', prerequisites:'Threads, executors, futures and interruption.', environment:'Java 17+.',
      explanation:'A fixed number of worker threads is not enough if the work queue can grow without limit. Give the executor a bounded queue and an explicit rejection policy. Treat saturation as an observable outcome so callers can slow down or return a controlled failure instead of accumulating work until memory is exhausted.',
      pitfall:'Submitting returns a Future; failures in the job are visible through get, not necessarily in the submitting thread. Shut down executors and preserve interrupt status when handling InterruptedException.',
      task:'Create a two-worker executor with a four-item queue and AbortPolicy. Use blocked test jobs to trigger rejection deterministically, then release them and shut down.',
      criteria:['At most two jobs run and at most four additional jobs wait.','Submitting another blocked job throws RejectedExecutionException.','The test releases its latch in finally and awaits shutdown; job failures are inspected through Future.get.'],hint:'Use CountDownLatch to control job completion in tests rather than relying on sleep timing.'
    },`import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

final class Pools {
  static ThreadPoolExecutor bounded() {
    return new ThreadPoolExecutor(2, 2, 0L, TimeUnit.MILLISECONDS,
        new ArrayBlockingQueue<>(4),
        new ThreadPoolExecutor.AbortPolicy());
  }
}
// Owner lifecycle:
// executor.shutdown();
// if (!executor.awaitTermination(5, TimeUnit.SECONDS)) executor.shutdownNow();
// On interruption: shutdownNow(), restore interrupt status, then propagate.`, 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html')
  ],
  rust:[
    lesson('intermediate','fallible-iteration',{
      title:'Fallible iteration with Result', prerequisites:'Ownership, iterators, enums and the ? operator.', environment:'Stable Rust; standard library only.',
      explanation:'Iterator adapters can transform parsing steps without hiding failures. Collecting an iterator of Result values into Result<Vec<_>, _> stops at the first error. This is useful when the entire configuration must be valid before any part is applied.',
      pitfall:'filter_map(Result::ok) silently discards invalid values. That may be appropriate for best-effort analytics, but it is a different contract from strict configuration validation.',
      task:'Parse comma-separated port numbers into Vec<u16>. Trim whitespace, reject empty tokens and reject numbers outside the u16 range.',
      criteria:['"80, 443" produces [80, 443].','"80,wrong" and "65536" return errors rather than partial vectors.','A trailing comma and an empty input are rejected under the stated contract.'],hint:'Map each trimmed token through parse::<u16>() and collect the Results.'
    },`use std::num::ParseIntError;

fn parse_ports(text: &str) -> Result<Vec<u16>, ParseIntError> {
    text.split(',')
        .map(|part| part.trim().parse::<u16>())
        .collect()
}`, 'https://doc.rust-lang.org/std/result/'),
    lesson('professional','bounded-channel',{
      title:'Backpressure and channel shutdown', prerequisites:'Threads, move closures and channel ownership.', environment:'Stable Rust; std::sync::mpsc.',
      explanation:'A bounded channel makes producers wait when consumers fall behind, bounding queued messages instead of moving the memory problem elsewhere. Closing every sender lets the receiver finish iteration. Decide how producer errors, consumer shutdown and thread panics will reach the owner.',
      pitfall:'Keeping an extra sender alive prevents the receiver iterator from terminating. Joining a producer before draining a full bounded channel can deadlock.',
      task:'Send ten numbers through a channel with capacity two, aggregate them in the receiver, and join the producer after consumption.',
      criteria:['The total is 45 and the receiver terminates after the sender is dropped.','A slow receiver never allows more than two queued messages.','Dropping the receiver causes send to return an error; the producer exits instead of retrying forever.'],hint:'Move the only sender into the producer and consume the receiver before joining.'
    },`use std::sync::mpsc::sync_channel;
use std::thread;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let (tx, rx) = sync_channel::<u32>(2);
    let producer = thread::spawn(move || {
        for value in 0..10 {
            if tx.send(value).is_err() { break; }
        }
    });
    let total: u32 = rx.iter().sum();
    producer.join().map_err(|_| "producer panicked")?;
    assert_eq!(total, 45);
    Ok(())
}`, 'https://doc.rust-lang.org/std/sync/mpsc/fn.sync_channel.html')
  ],
  go:[
    lesson('intermediate','error-contracts',{
      title:'Error wrapping without losing identity', prerequisites:'Functions, error values and file operations.', environment:'Go 1.20+.',
      explanation:'Add operation context to an error while retaining its cause with %w. Callers can then use errors.Is for a known condition or errors.As for a structured error. This separates useful diagnostics from control flow and avoids comparing fragile error-message strings.',
      pitfall:'Formatting with %v produces readable text but does not wrap the cause. Do not handle every file error as a missing file; permissions and I/O failures need different handling.',
      task:'Write a readConfig wrapper that includes the path in failures and preserves errors.Is(err, fs.ErrNotExist).',
      criteria:['A valid file returns its bytes.','A missing file remains identifiable with errors.Is.','A non-missing failure is propagated with context and is not converted into empty successful data.'],hint:'Return fmt.Errorf with %w at the boundary where you can add meaningful operation context.'
    },`package config

import (
    "fmt"
    "os"
)

func ReadConfig(path string) ([]byte, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("read config %q: %w", path, err)
    }
    return data, nil
}`, 'https://go.dev/blog/go1.13-errors'),
    lesson('professional','http-budgets',{
      title:'HTTP deadlines and bounded response bodies', prerequisites:'context.Context, io.Reader, HTTP response ownership.', environment:'Go 1.20+; inject a reusable http.Client.',
      explanation:'Bound both time and memory at a network boundary. A request context propagates the caller deadline to the transport; a child timeout can tighten that budget. Read at most the allowed body size plus one byte so oversized responses are detected instead of silently truncated. Close the body on every response path.',
      pitfall:'HTTP error status does not necessarily make Client.Do return an error. LimitReader alone truncates silently; the extra byte is what distinguishes an oversized body.',
      task:'Fetch a successful response with a two-second timeout and a 1 MiB body limit. Return errors for bad status, cancellation and oversize data.',
      criteria:['httptest handlers verify success, HTTP 500 and a body larger than 1 MiB.','Cancelling the parent context terminates the request.','Every received body is closed; a body exactly at the limit is accepted.'],hint:'Read limit+1 bytes and compare the resulting length with the limit.'
    },`package fetch

import (
    "context"
    "fmt"
    "io"
    "net/http"
    "time"
)

func SmallBody(parent context.Context, client *http.Client, url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(parent, 2*time.Second)
    defer cancel()
    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
    if err != nil { return nil, err }
    response, err := client.Do(req)
    if err != nil { return nil, err }
    defer response.Body.Close()
    if response.StatusCode < 200 || response.StatusCode >= 300 {
        return nil, fmt.Errorf("HTTP %d", response.StatusCode)
    }
    const limit = 1 << 20
    body, err := io.ReadAll(io.LimitReader(response.Body, limit+1))
    if err != nil { return nil, err }
    if len(body) > limit { return nil, fmt.Errorf("body exceeds limit") }
    return body, nil
}`, 'https://pkg.go.dev/net/http#NewRequestWithContext')
  ],
  ruby:[
    lesson('intermediate','lazy-enumeration',{
      title:'Lazy enumeration and bounded consumption', prerequisites:'Enumerable, blocks and file iteration.', environment:'Ruby 3.x.',
      explanation:'A lazy enumerator composes transformations without processing the entire source immediately. Use a terminal operation such as take(...).force to make the consumption boundary explicit. Keep the source open while consuming it and avoid accidentally calling to_a before filtering.',
      pitfall:'Laziness does not make an individual operation cheap. A filter that never matches may still scan the entire input before producing a result.',
      task:'Return the first three nonblank trimmed lines from an enumerable, without reading the remainder after three matches.',
      criteria:['Whitespace-only lines are skipped.','Fewer than three matches return the available lines.','An instrumented source confirms that lines after the third match are not consumed.'],hint:'Compose lazy.map.reject.take and materialize only at the end.'
    },`def first_three(lines)
  lines.lazy
       .map(&:strip)
       .reject(&:empty?)
       .take(3)
       .force
end

File.open("notes.txt", "r:utf-8") do |file|
  p first_three(file.each_line)
end`, 'https://docs.ruby-lang.org/en/master/Enumerator/Lazy.html'),
    lesson('professional','mutex-invariants',{
      title:'Protecting a shared-state invariant', prerequisites:'Threads, mutable hashes and synchronization.', environment:'Ruby 3.x; do not depend on a particular interpreter lock.',
      explanation:'A read-modify-write sequence is a single logical operation even when it takes several language statements. Protect the invariant with a mutex, not just the assignment. Keep the critical section short and return a copy when exposing the state so callers cannot mutate it without synchronization.',
      pitfall:'Interpreter-level scheduling is not a substitute for a documented synchronization contract. Avoid slow I/O and callbacks while holding the mutex.',
      task:'Implement a thread-safe event counter with increment and snapshot methods. Join all worker threads before checking the final counts.',
      criteria:['Ten threads incrementing the same key 1000 times produce 10000.','Changing a returned snapshot does not change the internal counter.','Every access to the shared hash follows the same mutex contract.'],hint:'Use Mutex#synchronize for both increment and snapshot.'
    },`class Counter
  def initialize
    @counts = Hash.new(0)
    @mutex = Mutex.new
  end

  def increment(key)
    @mutex.synchronize { @counts[key] += 1 }
  end

  def snapshot
    @mutex.synchronize { @counts.dup }
  end
end

counter = Counter.new
workers = 10.times.map { Thread.new { 1000.times { counter.increment(:event) } } }
workers.each(&:join)
raise "lost update" unless counter.snapshot[:event] == 10_000`, 'https://docs.ruby-lang.org/en/master/Thread/Mutex.html')
  ],
  swift:[
    lesson('intermediate','decoding-contracts',{
      title:'Typed decoding and domain validation', prerequisites:'Structs, optionals, throwing functions and Codable.', environment:'Swift 5.9+ with Foundation.',
      explanation:'Decodable verifies the shape of incoming data, but a successfully decoded value can still violate a business rule. Keep structural decoding and domain validation as separate visible steps. Propagate errors rather than using force-try on data outside your control.',
      pitfall:'Making every property optional can hide a broken API contract. Use optional fields only when missing values have a defined meaning.',
      task:'Decode a user with an integer id and a nonblank name. Reject invalid structure and reject a name that becomes empty after trimming.',
      criteria:['A valid object returns a user with a trimmed name.','A missing id or a string id fails decoding.','A whitespace-only name produces a domain-validation error without a crash.'],hint:'Decode first, normalize the name, then enforce the invariant with guard.'
    },`import Foundation

struct User: Decodable {
    let id: Int
    let name: String
}
enum UserError: Error { case emptyName }

func decodeUser(_ data: Data) throws -> User {
    let raw = try JSONDecoder().decode(User.self, from: data)
    let name = raw.name.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !name.isEmpty else { throw UserError.emptyName }
    return User(id: raw.id, name: name)
}`, 'https://developer.apple.com/documentation/foundation/archives_and_serialization/encoding_and_decoding_custom_types'),
    lesson('professional','actor-invariants',{
      title:'Actor isolation and reentrancy boundaries', prerequisites:'async/await, task groups and actor isolation.', environment:'Swift 5.9+; call the example from an async context.',
      explanation:'An actor serializes access to its isolated state, but an actor method can suspend at await and allow other work to run. Keep a state transition that must be indivisible free of suspension points. If you await external work, recheck assumptions or model an explicit reservation state before committing.',
      pitfall:'Actor isolation alone does not make a multi-step workflow atomic across await. Reading stock, awaiting payment and then decrementing the old value can violate the invariant.',
      task:'Reserve a single inventory item from ten concurrent tasks. Exactly one reservation may succeed. Explain what would change if reservation awaited an external payment.',
      criteria:['Ten concurrent calls yield exactly one true result.','Stock never becomes negative and the isolated state is not exposed directly.','The review identifies await as a reentrancy boundary and proposes a reservation/compensation policy for external work.'],hint:'Check and decrement stock in the same actor-isolated method without awaiting between them.'
    },`actor Inventory {
    private var stock = 1

    func reserve() -> Bool {
        guard stock > 0 else { return false }
        stock -= 1
        return true
    }
}

func reservationCount() async -> Int {
    let inventory = Inventory()
    return await withTaskGroup(of: Bool.self, returning: Int.self) { group in
        for _ in 0..<10 { group.addTask { await inventory.reserve() } }
        var successes = 0
        for await reserved in group { if reserved { successes += 1 } }
        return successes
    }
}`, 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/')
  ],
  dart:[
    lesson('intermediate','typed-json',{
      title:'Validating JSON at a typed boundary', prerequisites:'Null safety, maps, exceptions and constructors.', environment:'Dart 3.x.',
      explanation:'A decoded JSON value is dynamic, so a typed model should validate it before the rest of the application relies on it. Check shape and field types explicitly. Normalize only where the contract permits it; silently converting every input to a string can conceal an upstream data error.',
      pitfall:'An unchecked cast moves an error to an unpredictable later point. Missing fields and valid nullable fields need different contracts.',
      task:'Construct a User from an unknown value. Require an integer id and a nonempty trimmed string name, and reject malformed input with FormatException.',
      criteria:['A valid map creates the expected immutable user.','A list, null, a string id and a missing name are rejected.','Whitespace-only names fail; leading and trailing spaces are removed from valid names.'],hint:'Promote Object? with type checks before reading map fields.'
    },`class User {
  final int id;
  final String name;
  const User(this.id, this.name);

  factory User.fromJson(Object? value) {
    if (value is! Map<String, dynamic>) {
      throw const FormatException('Expected an object');
    }
    final id = value['id'];
    final name = value['name'];
    if (id is! int || name is! String || name.trim().isEmpty) {
      throw const FormatException('Invalid user');
    }
    return User(id, name.trim());
  }
}`, 'https://dart.dev/null-safety/understanding-null-safety'),
    lesson('professional','stale-futures',{
      title:'Async lifetime and stale-result suppression', prerequisites:'Futures, async/await and UI lifecycle ownership.', environment:'Dart 3.x; works independently of Flutter.',
      explanation:'A Future does not automatically cancel the underlying operation when a screen disappears. Use a generation token to stop stale operations from publishing results, and invalidate it when the owner is disposed. Inject the operation and callbacks so races can be tested with Completers instead of real network timing.',
      pitfall:'Ignoring a result saves UI correctness, not network or CPU work. If the transport supports cancellation, cancel it separately; do not describe a generation check as transport cancellation.',
      task:'Build a latest-only loader that ignores obsolete results and errors and never calls its callbacks after dispose.',
      criteria:['Complete the second request before the first: only the second result is published.','After dispose, neither successes nor failures invoke callbacks.','A stale failure is handled without becoming an unhandled asynchronous error.'],hint:'Capture an incrementing ticket before await and compare it again in both success and catch paths.'
    },`class Latest<T> {
  int _generation = 0;
  bool _disposed = false;

  Future<void> run(Future<T> Function() operation,
      void Function(T) onValue, void Function(Object) onError) async {
    if (_disposed) return;
    final ticket = ++_generation;
    try {
      final value = await operation();
      if (!_disposed && ticket == _generation) onValue(value);
    } catch (error) {
      if (!_disposed && ticket == _generation) onError(error);
    }
  }

  void dispose() { _disposed = true; _generation++; }
}`, 'https://dart.dev/libraries/async/async-await')
  ],
  assembler:[
    lesson('intermediate','array-abi',{
      title:'Array traversal and a calling convention', prerequisites:'Registers, addressing, jumps and unsigned arithmetic.', environment:'NASM, x86-64 Linux, System V AMD64 ABI.',
      explanation:'An assembly function is a contract with its caller. Here RDI points to uint64_t values, RSI is the count, and RAX contains the result. Check the count before reading memory so the zero-length case needs no dereference. Document overflow instead of assuming mathematical integers.',
      pitfall:'The caller must provide at least count readable elements. Unsigned addition wraps modulo 2^64; this routine does not detect overflow or validate arbitrary pointers.',
      task:'Implement uint64_t sum_u64(const uint64_t*, size_t). Preserve callee-saved registers and handle zero elements without reading the pointer.',
      criteria:['Counts 0, 1 and 3 produce the expected sums.','The zero-length call performs no memory read.','The C harness tests wraparound and verifies that the function follows the stated ABI.'],hint:'Use only caller-saved registers and branch on the count before the first load.'
    },`bits 64
section .text
global sum_u64
sum_u64:
    xor eax, eax
    test rsi, rsi
    jz .done
.loop:
    add rax, [rdi]
    add rdi, 8
    dec rsi
    jnz .loop
.done:
    ret
section .note.GNU-stack noalloc noexec nowrite progbits`, 'https://www.nasm.us/docs.php'),
    lesson('professional','partial-write',{
      title:'Partial writes and interrupted syscalls', prerequisites:'Linux syscall ABI, errno conventions and buffer ownership.', environment:'NASM, Linux x86-64; a blocking writable file descriptor.',
      explanation:'A successful write syscall can transfer fewer bytes than requested. Advance the pointer and reduce the remaining count until completion. Retry EINTR only when the syscall reports interruption before transferring data. Return other errors to the caller so policy stays outside the low-level primitive.',
      pitfall:'The raw Linux syscall returns negative errno in RAX; libc normally converts that to -1 and errno. This routine does not handle SIGPIPE policy or nonblocking EAGAIN by waiting, and a later failure can follow an already-written prefix.',
      task:'Implement a write_all routine that handles short writes, retries EINTR and returns either the original length or a negative errno. Document partial progress on failure.',
      criteria:['Zero length succeeds without making a syscall.','A test shim that returns short writes and EINTR eventually writes every byte exactly once.','Other negative errors are returned; a zero-byte write with bytes remaining does not cause an infinite loop.'],hint:'Keep the original length in R8; syscall clobbers RCX and R11.'
    },`bits 64
section .text
global write_all
; RDI = fd, RSI = buffer, RDX = length
write_all:
    mov r8, rdx
.again:
    test rdx, rdx
    jz .done
    mov eax, 1
    syscall
    cmp rax, -4             ; EINTR
    je .again
    test rax, rax
    js .error
    jz .stalled
    add rsi, rax
    sub rdx, rax
    jmp .again
.done:
    mov rax, r8
    ret
.stalled:
    mov rax, -5             ; EIO
.error:
    ret
section .note.GNU-stack noalloc noexec nowrite progbits`, 'https://man7.org/linux/man-pages/man2/write.2.html')
  ],
  c:[
    lesson('intermediate','strict-integer',{
      title:'Integer parsing with a complete error contract', prerequisites:'Pointers, standard-library calls and return codes.', environment:'C11 or newer.',
      explanation:'atoi cannot distinguish invalid input from a valid zero and does not expose overflow. Use strtol with errno and an end pointer, then check the destination type range before conversion. Define whitespace behavior explicitly instead of accidentally accepting trailing garbage.',
      pitfall:'Reset errno before the conversion. Casting a value outside int range is not a validation strategy. The output value should remain unchanged on failure.',
      task:'Parse a string into int, allowing leading whitespace but rejecting trailing characters. Return success or failure and write through the output pointer only on success.',
      criteria:['Zero, negative values and INT_MAX are accepted.','Empty input, trailing text and values outside int range are rejected.','On failure the caller output remains unchanged.'],hint:'Require end != text, *end == 0, no ERANGE, and a value between INT_MIN and INT_MAX.'
    },`#include <errno.h>
#include <limits.h>
#include <stdlib.h>

int parse_int(const char *text, int *out) {
    if (!text || !out) return 0;
    errno = 0;
    char *end;
    long value = strtol(text, &end, 10);
    if (end == text || *end != '\\0' || errno == ERANGE ||
        value < INT_MIN || value > INT_MAX) return 0;
    *out = (int)value;
    return 1;
}`, 'https://man7.org/linux/man-pages/man3/strtol.3.html'),
    lesson('professional','safe-resize',{
      title:'Failure-safe resizing and allocation overflow', prerequisites:'malloc/realloc/free, size_t and ownership.', environment:'C11 or newer.',
      explanation:'A resize must protect both arithmetic and ownership. Check element-count multiplication before allocating, store realloc in a temporary pointer, and update the owner only after success. Define a separate zero-size policy so callers do not depend on platform-specific zero-size realloc behavior.',
      pitfall:'Assigning realloc directly to the only owning pointer leaks the old allocation on failure. A size check prevents wraparound but cannot guarantee that a large allocation will succeed.',
      task:'Resize an owned int buffer by element count. On allocation failure leave the original pointer and data intact; for zero count free it and set the pointer to NULL.',
      criteria:['Growth preserves the old prefix; shrinking retains the remaining prefix.','An injected allocation failure leaves the original owner unchanged.','Counts exceeding SIZE_MAX / sizeof(int) are rejected before realloc; zero count clears the owner.'],hint:'Commit the temporary pointer only after a non-NULL result.'
    },`#include <stdint.h>
#include <stdlib.h>

int resize_ints(int **owner, size_t count) {
    if (!owner) return 0;
    if (count == 0) {
        free(*owner);
        *owner = NULL;
        return 1;
    }
    if (count > SIZE_MAX / sizeof **owner) return 0;
    int *next = realloc(*owner, count * sizeof **owner);
    if (!next) return 0;
    *owner = next;
    return 1;
}`, 'https://man7.org/linux/man-pages/man3/malloc.3.html')
  ],
  sql:[
    lesson('intermediate','window-totals',{
      title:'Window functions and deterministic running totals', prerequisites:'SELECT, ORDER BY, aggregation and numeric types.', environment:'PostgreSQL 14+; the sample uses a CTE as its input table.',
      explanation:'GROUP BY collapses rows; a window function keeps each row while calculating over a related set. Specify a stable ordering and an explicit frame for a running total. A tie-breaking id makes the result deterministic when several rows share the same timestamp.',
      pitfall:'The window ORDER BY controls the calculation but does not guarantee output order. Add a final ORDER BY, and distinguish ROWS from peer-group behavior in RANGE frames.',
      task:'Calculate a running payment total for each account, preserving individual rows and breaking equal timestamps by id.',
      criteria:['Each input payment remains one output row.','Totals restart per account and advance in timestamp/id order.','Two payments with the same timestamp produce deterministic intermediate totals.'],hint:'Use PARTITION BY account_id and ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.'
    },`WITH payments(id, account_id, paid_at, amount) AS (
  VALUES (1, 7, TIMESTAMP '2026-01-01 10:00', 10::numeric),
         (2, 7, TIMESTAMP '2026-01-01 10:00', 20::numeric),
         (3, 8, TIMESTAMP '2026-01-01 11:00', 5::numeric)
)
SELECT id, account_id, amount,
       SUM(amount) OVER (
         PARTITION BY account_id ORDER BY paid_at, id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM payments
ORDER BY account_id, paid_at, id;`, 'https://www.postgresql.org/docs/current/tutorial-window.html'),
    lesson('professional','concurrent-stock',{
      title:'Concurrent updates and inventory invariants', prerequisites:'Transactions, row locking and constraints.', environment:'PostgreSQL 14+; run setup only in a disposable test database.',
      explanation:'Avoid reading stock in one statement and later writing a value computed from that old read. Put the condition and decrement in one UPDATE. Under Read Committed, a conflicting updater waits and rechecks its WHERE condition on the updated row. A CHECK constraint adds defense in depth.',
      pitfall:'No returned row means the reservation did not succeed. Retrying after an unknown commit outcome can reserve twice; production request retries require a separate idempotency-key design.',
      task:'Reserve one unit without allowing negative stock. Test two competing transactions against the last unit, and distinguish successful reservation from zero returned rows.',
      criteria:['Starting with stock 1, only one of two concurrent reservations returns a row.','ROLLBACK restores the reservation; COMMIT persists it.','The review explains lock waits, no-row outcomes and why request retries need idempotency.'],hint:'Use UPDATE ... WHERE stock > 0 RETURNING rather than SELECT followed by an unconditional UPDATE.'
    },`CREATE TABLE inventory_demo (
  id integer PRIMARY KEY,
  stock integer NOT NULL CHECK (stock >= 0)
);
INSERT INTO inventory_demo VALUES (1, 1);

-- Run the transaction in two sessions; do not rerun setup there.
BEGIN;
SET LOCAL lock_timeout = '2s';
UPDATE inventory_demo
SET stock = stock - 1
WHERE id = 1 AND stock > 0
RETURNING id, stock;
COMMIT;
-- The application treats zero returned rows as unavailable stock.`, 'https://www.postgresql.org/docs/current/transaction-iso.html')
  ],
  json:[
    lesson('intermediate','schema-contract',{
      title:'A JSON Schema contract with boundary cases', prerequisites:'JSON types, objects, arrays and required fields.', environment:'A validator supporting JSON Schema draft 2020-12.',
      explanation:'Valid JSON syntax does not imply valid application data. A schema can describe field types, required keys, ranges and array constraints. Choose whether unknown properties are accepted: that decision affects compatibility with future producers and should be part of the contract.',
      pitfall:'Declaring a property does not make it required. JSON Schema validates structure and local constraints; it does not replace authorization or every cross-record business rule.',
      task:'Define an order schema with a string id and at least one item. Each item needs a sku and an integer quantity of at least one. Reject unknown fields under this strict contract.',
      criteria:['An order with one valid item passes.','Empty items, a missing id, fractional quantity and quantity zero fail.','Unknown fields fail at both the order and item levels.'],hint:'Use required and additionalProperties at each object level, not just at the root.'
    },`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["id", "items"],
  "additionalProperties": false,
  "properties": {
    "id": {"type": "string", "minLength": 1},
    "items": {
      "type": "array", "minItems": 1,
      "items": {
        "type": "object", "required": ["sku", "quantity"],
        "additionalProperties": false,
        "properties": {
          "sku": {"type": "string", "minLength": 1},
          "quantity": {"type": "integer", "minimum": 1}
        }
      }
    }
  }
}`, 'https://json-schema.org/understanding-json-schema/reference/object'),
    lesson('professional','contract-evolution',{
      title:'Schema evolution and numeric interoperability', prerequisites:'Schema validation, API consumers and backward compatibility.', environment:'Language-independent JSON API design; test with each consumer runtime.',
      explanation:'An API contract must survive old and new consumers existing at the same time. Version breaking changes explicitly and define unknown-field behavior. Large integer identifiers may lose precision when parsed as JavaScript numbers, so a decimal string can be a safer interoperable identifier representation.',
      pitfall:'Changing a field from number to string is a breaking change even if it looks similar on screen. JSON object member order must not carry application meaning, and ordinary serialization is not a canonical signing format.',
      task:'Design a versioned event envelope with a string identifier and an integer minor-unit monetary amount. Define how consumers handle unknown versions and additive fields.',
      criteria:['The id 9007199254740993 round-trips exactly in JavaScript, Python and the intended backend.','Consumers explicitly reject or route unsupported versions instead of guessing the shape.','The contract specifies currency, minor units, amount bounds and unknown-field behavior.'],hint:'Write compatibility fixtures for an old event, a new additive field and an unsupported version.'
    },`{
  "schemaVersion": 1,
  "eventType": "payment.recorded",
  "eventId": "9007199254740993",
  "occurredAt": "2026-01-01T10:00:00Z",
  "payload": {
    "currency": "USD",
    "amountMinor": 1250
  }
}`, 'https://www.rfc-editor.org/rfc/rfc8259')
  ],
  typescript:[
    lesson('intermediate','exhaustive-unions',{
      title:'Discriminated unions and exhaustive handling', prerequisites:'Interfaces, union types, strict mode.', environment:'TypeScript with strict: true.',
      explanation:'Represent mutually exclusive states as a discriminated union instead of an object with many optional fields. Narrow on the discriminator before accessing state-specific data. An exhaustive never check makes adding a state a compile-time prompt to update every relevant handler.',
      pitfall:'A type assertion can silence the very check you need. Keep the discriminant literal and do not widen it to a general string.',
      task:'Model loading, success and failure states and render a message for each. Add a fourth state and confirm that the exhaustive handler requires an update.',
      criteria:['Success requires a value and failure requires an error.','Accessing a state-specific property before narrowing fails type checking.','Adding a new union member causes the assertNever call to fail compilation until handled.'],hint:'Use a switch on kind and return assertNever(state) in the default branch.'
    },`type State =
  | { kind: "loading" }
  | { kind: "success"; value: string }
  | { kind: "failure"; error: string };

function assertNever(value: never): never {
  throw new Error("Unhandled state");
}

function message(state: State): string {
  switch (state.kind) {
    case "loading": return "Loading";
    case "success": return state.value;
    case "failure": return state.error;
    default: return assertNever(state);
  }
}`, 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html'),
    lesson('professional','runtime-domain-boundary',{
      title:'Runtime validation and branded domain values', prerequisites:'unknown, type guards, structural typing and JSON parsing.', environment:'TypeScript with strict: true; ES2020 or newer.',
      explanation:'TypeScript types disappear at runtime, so data arriving from JSON is still untrusted. Validate it at the boundary and only then construct a domain value. A branded type can prevent accidental mixing of plain numbers and validated monetary amounts inside typed application code.',
      pitfall:'A brand is not a security boundary: any, assertions and JavaScript callers can bypass it. Preserve runtime checks at every external boundary and use safe integer bounds for numeric minor units.',
      task:'Parse a JSON object into a validated nonnegative safe-integer amount. Return a branded Cents value and reject malformed or unsafe data.',
      criteria:['0 and 1250 are accepted; negative, fractional, NaN and unsafe integers are rejected.','A missing amount, null, an array and a string amount are rejected.','A plain number cannot be passed where Cents is required without explicit construction or an unsafe escape.'],hint:'Assign JSON.parse to unknown and narrow the object and amount before applying the brand.'
    },`declare const centsBrand: unique symbol;
type Cents = number & { readonly [centsBrand]: true };

function cents(value: unknown): Cents {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error("Invalid minor-unit amount");
  }
  return value as Cents;
}

function parseAmount(text: string): Cents {
  const data: unknown = JSON.parse(text);
  if (typeof data !== "object" || data === null || Array.isArray(data) || !("amount" in data)) {
    throw new Error("Expected an amount object");
  }
  return cents(data.amount);
}`, 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html')
  ],
  php:[
    lesson('intermediate','prepared-queries',{
      title:'Prepared queries and explicit input validation', prerequisites:'PDO, arrays, exceptions and basic SQL.', environment:'PHP 8.1+; configured PDO connection and a users table.',
      explanation:'Validate application input separately from constructing SQL. Prepared statements bind values so data is not parsed as part of the query structure. Use a whitelist for structural choices such as column names, because placeholders bind values rather than arbitrary SQL identifiers.',
      pitfall:'Do not concatenate user input into an ORDER BY clause and assume a prepared WHERE makes the whole query safe. Validation and authorization are separate responsibilities.',
      task:'Look up a user by a positive integer id using a prepared statement. Return null when absent and reject malformed ids before querying.',
      criteria:['A valid id returns a row or null.','Zero, negative and non-integer input are rejected before SQL executes.','The id is bound as a parameter; no request value is concatenated into SQL.'],hint:'Set PDO::ERRMODE_EXCEPTION at connection setup and bind the validated id with PDO::PARAM_INT.'
    },`<?php
function findUser(PDO $db, mixed $input): ?array {
    if (!is_int($input) && !is_string($input))
        throw new InvalidArgumentException('Invalid id');
    $id = filter_var($input, FILTER_VALIDATE_INT, [
        'options' => ['min_range' => 1]
    ]);
    if ($id === false) throw new InvalidArgumentException('Invalid id');
    $query = $db->prepare('SELECT id, name FROM users WHERE id = :id');
    $query->bindValue(':id', $id, PDO::PARAM_INT);
    $query->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);
    return $row === false ? null : $row;
}`, 'https://www.php.net/manual/en/pdo.prepared-statements.php'),
    lesson('professional','transaction-boundary',{
      title:'Transactional ownership and rollback paths', prerequisites:'PDO exceptions, transaction isolation and affected-row checks.', environment:'PHP 8.1+; PDO in exception mode; transactional SQL engine.',
      explanation:'A function that owns a transaction must define success, rollback and nested-call behavior. Combine a stock condition with its update, inspect the affected row count, and commit only after the operation succeeds. Keep external network side effects outside this transaction unless a larger consistency protocol handles them.',
      pitfall:'PDO does not provide portable nested transactions through repeated beginTransaction calls. Some statements trigger implicit commits on some engines; avoid DDL inside this workflow.',
      task:'Reserve a positive quantity from inventory in an owned transaction. Roll back on unavailable stock or exceptions and reject invocation inside an existing transaction.',
      criteria:['Success reduces stock by the requested quantity and commits.','Insufficient stock rolls back and returns false; exceptions roll back and propagate.','Nested invocation is rejected; concurrent callers cannot make stock negative.'],hint:'Use distinct parameter names for quantity and minimum when native prepares do not allow repeated named parameters.'
    },`<?php
function reserve(PDO $db, int $id, int $quantity): bool {
    if ($quantity < 1) throw new InvalidArgumentException('Invalid quantity');
    if ($db->inTransaction()) throw new LogicException('Transaction already active');
    $db->beginTransaction();
    try {
        $query = $db->prepare('UPDATE inventory SET stock = stock - :qty
                              WHERE id = :id AND stock >= :minimum');
        $query->execute(['qty' => $quantity, 'id' => $id, 'minimum' => $quantity]);
        if ($query->rowCount() !== 1) {
            $db->rollBack();
            return false;
        }
        $db->commit();
        return true;
    } catch (Throwable $error) {
        if ($db->inTransaction()) $db->rollBack();
        throw $error;
    }
}`, 'https://www.php.net/manual/en/pdo.transactions.php')
  ],
  powershell:[
    lesson('intermediate','pipeline-functions',{
      title:'Pipeline functions that return structured objects', prerequisites:'Cmdlets, pipeline binding and parameter validation.', environment:'PowerShell 7.x; read-only file inspection.',
      explanation:'A reusable command should accept pipeline input and emit objects that callers can filter or export. Use process for per-input work and keep presentation separate from data. LiteralPath treats a supplied path literally instead of interpreting wildcard characters.',
      pitfall:'Formatting commands such as Format-Table belong at the display boundary. Returning their formatting records from a function prevents normal object processing downstream.',
      task:'Write Get-FileSummary to accept paths from the pipeline and emit one object per file containing its name and byte length. Report missing paths as errors.',
      criteria:['Two piped file paths produce two objects with Name and Bytes properties.','Names containing wildcard characters are treated literally.','The results can be piped to Export-Csv without parsing display text.'],hint:'Use CmdletBinding, ValueFromPipeline, process and PSCustomObject.'
    },`function Get-FileSummary {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, ValueFromPipeline)]
        [ValidateNotNullOrEmpty()]
        [string] $Path
    )
    process {
        $item = Get-Item -LiteralPath $Path -ErrorAction Stop
        if ($item.PSIsContainer) { throw "Expected a file: $Path" }
        [pscustomobject]@{ Name = $item.Name; Bytes = $item.Length }
    }
}`, 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_parameters'),
    lesson('professional','shouldprocess-contract',{
      title:'Reviewable automation with ShouldProcess', prerequisites:'Advanced functions, error handling and filesystem paths.', environment:'PowerShell 7.x; test only in a disposable directory.',
      explanation:'Administrative commands should make their intended changes inspectable before execution. SupportsShouldProcess provides WhatIf and Confirm integration, but your code must call ShouldProcess around the actual mutation. Resolve targets once, validate collisions and surface failures instead of reporting success before an operation completes.',
      pitfall:'Declaring SupportsShouldProcess without calling ShouldProcess does not protect a mutation. Preview is not an atomic transaction: filesystem state can change between validation and rename.',
      task:'Implement Add-BackupSuffix to rename a file by adding .bak. Support WhatIf and Confirm, reject directories and existing destinations, and avoid overwriting files.',
      criteria:['-WhatIf reports the intended rename without changing the filesystem.','A successful call creates the suffixed name; a collision fails without overwriting either file.','Literal paths containing brackets work, and errors terminate the operation.'],hint:'Validate the resolved item, then gate Rename-Item with $PSCmdlet.ShouldProcess.'
    },`function Add-BackupSuffix {
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'Medium')]
    param([Parameter(Mandatory)][string] $Path)

    $item = Get-Item -LiteralPath $Path -ErrorAction Stop
    if ($item.PSIsContainer) { throw 'Expected a file' }
    $newName = $item.Name + '.bak'
    $destination = Join-Path $item.DirectoryName $newName
    if (Test-Path -LiteralPath $destination) { throw 'Destination exists' }
    if ($PSCmdlet.ShouldProcess($item.FullName, "Rename to $newName")) {
        Rename-Item -LiteralPath $item.FullName -NewName $newName -ErrorAction Stop
    }
}`, 'https://learn.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-shouldprocess')
  ]
};
