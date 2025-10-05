export const runtime = 'edge';

function formatStars(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(count);
}

// Parse formatted number from Shields.io (e.g., "1.2k", "5M", "123")
function parseShieldsValue(value: string): number {
  if (!value) return 0;
  
  const cleanValue = value.toString().trim();
  
  // Handle millions
  if (cleanValue.endsWith('M') || cleanValue.endsWith('m')) {
    const num = parseFloat(cleanValue.slice(0, -1));
    return isNaN(num) ? 0 : Math.round(num * 1000000);
  }
  
  // Handle thousands
  if (cleanValue.endsWith('K') || cleanValue.endsWith('k')) {
    const num = parseFloat(cleanValue.slice(0, -1));
    return isNaN(num) ? 0 : Math.round(num * 1000);
  }
  
  // Handle plain numbers
  const num = parseInt(cleanValue, 10);
  return isNaN(num) ? 0 : num;
}

// Cache for 5 minutes (300 seconds) with shorter stale-while-revalidate
const CACHE_TTL = 300;
const STALE_TTL = 3600; // 1 hour

export async function GET() {
  const repo = 'dodopayments/billingsdk';
  
  // Create AbortController with timeout
  const controller = new AbortController();
  const timeout = 5000; // 5 seconds
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Fetch stars from Shields.io badge
    const starsUrl = `https://img.shields.io/github/stars/${repo}.json`;
    const starsResponse = await fetch(starsUrl, { 
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      signal: controller.signal
    });
    
    // Fetch forks from Shields.io badge
    const forksUrl = `https://img.shields.io/github/forks/${repo}.json`;
    const forksResponse = await fetch(forksUrl, { 
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      signal: controller.signal
    });
    
    // Fetch closed pull requests from GitHub API through Shields.io
    // Using a custom query to filter for closed PRs specifically
    const closedPrsUrl = `https://img.shields.io/github/issues-pr-closed/${repo}.json`;
    const closedPrsResponse = await fetch(closedPrsUrl, { 
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      signal: controller.signal
    });
    
    // Clear timeout since fetch completed
    clearTimeout(timeoutId);
    
    if (!starsResponse.ok || !forksResponse.ok || !closedPrsResponse.ok) {
      const fallback = { stars: null, pretty: null, forks: null, forksPretty: null, closedPrs: null, closedPrsPretty: null };
      return new Response(JSON.stringify(fallback), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': `s-maxage=${CACHE_TTL / 6}, stale-while-revalidate=${STALE_TTL / 6}`,
        },
      });
    }
    
    const starsData = await starsResponse.json();
    const forksData = await forksResponse.json();
    const closedPrsData = await closedPrsResponse.json();
    
    // Extract numbers from Shields.io badge data
    const stars = parseShieldsValue(starsData?.message || '0');
    const forks = parseShieldsValue(forksData?.message || '0');
    const closedPrs = parseShieldsValue(closedPrsData?.message || '0');
    
    const body = { 
      stars, 
      pretty: formatStars(stars), 
      forks, 
      forksPretty: formatStars(forks),
      closedPrs,
      closedPrsPretty: formatStars(closedPrs)
    };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': `s-maxage=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
      },
    });
  } catch (error) {
    // Clear timeout in case of error
    clearTimeout(timeoutId);
    
    // Handle abort error specifically
    if (error instanceof Error && error.name === 'AbortError') {
      return new Response(JSON.stringify({ 
        stars: null, 
        pretty: null, 
        forks: null, 
        forksPretty: null,
        closedPrs: null,
        closedPrsPretty: null,
        error: 'Request timeout'
      }), {
        status: 408,
        headers: {
          'content-type': 'application/json',
          'cache-control': `s-maxage=60, stale-while-revalidate=600`,
        },
      });
    }
    
    const fallback = { stars: null, pretty: null, forks: null, forksPretty: null, closedPrs: null, closedPrsPretty: null };
    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': `s-maxage=${CACHE_TTL / 6}, stale-while-revalidate=${STALE_TTL / 6}`,
      },
    });
  }
}