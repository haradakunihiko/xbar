#!/usr/bin/env -S -P/${HOME}/.deno/bin:/opt/homebrew/bin deno run --allow-net=api.github.com --allow-env
/// <reference lib="deno.ns" />
 
// <xbar.title>GitHub Notifications</xbar.title>
// <xbar.version>v1.0.0</xbar.version>
// <xbar.author>haradakunihiko</xbar.author>
// <xbar.author.github>haradakunihiko</xbar.author.github>
// <xbar.desc></xbar.desc>
// <xbar.image></xbar.image>
// <xbar.dependencies>deno</xbar.dependencies>
// <xbar.abouturl>https://github.com/haradakunihiko/xbar</xbar.abouturl>
// <xbar.var>string(VAR_GITHUB_TOKEN=""): GITHUB API token to get access to remote data.</xbar.var>

import { xbar, separator } from "https://deno.land/x/xbar@v2.1.0/mod.ts";

const ICON_BASE = 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAA'
const ICON_MERGE = ICON_BASE+ 'TJJREFUKJG9krFOAlEQRe/MLpqHnd/ATyBWsLWF+hcLPYXibvwCE/gLC2MNVrD7AbbGnpjYboBlro2QXWATabzVy5x338ydPKBC4awTVTEA8Huz9i1FI5gZBINh6+0lnHUiEXkAUGmWMGm/c7Fues4pLU9IPv+aAABm9i2qT6Pm+BECbuoqpnZWW4lmmRLG3ZdV9VyAOEyD+1JdVO4yqX+ua7UPofRHrUlEMgaA4cVYALkEACF6e/N2k4DdJCh1Ky7nENftyVACo9akcjElox3I9yfjsdoaVfFPHbtpcG2GOUy/wjS42r0QTjs3ZpibYV7kPmkxVuuGOKfIl1MAr0WjqMRcrBqec8oCVwDwnNOFnwugezkJ4+ZnFbkPeANanpwsAQr7+2m8Qab1FKcAeYgfqR/3P4pMOYR15QAAAABJRU5ErkJggg==';
const ICON_MERGE_CAUTION = 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAABE0lEQVR4AZ1Sy27CMBCk976+pz2AbFcq5AFtUe/9kYo/4xDHXLgA+QeQgD8AwozBQguJEESeZHdmZ5PY26i7bKwHdZrnbVv188QUWVtNbUf1SNIErmRcCxep2fCj+Tjqfz6juAgmxCWRRWqdp+a//Gs8iCY20ZPsrfU0bDVf2eTcSLMHzMLoUpPkiV6iwcpGOqIYzIxd17x7I2qYCxwEI/6J5lBUpXuNAt6480nFjTpxIZHEJmwvhCNBnTimpwfJu42uozanVjJiY0KyyEjebMRxfNuuXmBz5tj6FH3EsrH68TpqhM5DD5PDsRMuJPiaolKnkeM2/tUveOsEtWJRD5MldNczX+xK2FjHwoXkmo6S29Yed6S/wL/h084AAAAASUVORK5CYII=';
const ICON_CAUTION = ICON_BASE+ 'ZxJREFUKJGdkjFoU2EUhb97k9jNRzEFoWvJVHXoZCqIaQaH7JaUbtpi2zc4ORWJYKGTYJLBroFaiGPo0hBwyAOhU51Cd8EOOid53uugL4SnkOK3/dx7OPccfvhPZPqxHZUWc0gIUjFs6c/CJdDBtN580P36lzCM1jZ+mr9HuFKkJfgXABO9i/mmqOTd7VlztXcyEYbR2oabtFx5kx+Oa7VHn+LpS7bOV3K5UfBaTF+6WLW52juR7ai0mDEGovq2WezuJ8t7UdkBGsXu5KqdfvlQhOeeGRc0h4QIV/nhuDarkIVgft+xHxJnQwWpKNJKn/cvasvtkcCxuFTUsKWkiOsgrhcoBb2uIE1W4NKRO8DH6cF0KSnLewYDBTqGb26dr+Sm53tR2ZNmE8LTx3O4V9XpKKZ1FV24MZyf2aoH8YE5garXBWC3X1oX12NXO8zfvPWqttwepZ08iA9wXqDypFE8a09y7PZL64geCXx37IO4XiSZcK/+dso8bRTP2pD65DufH96WOBuKSwWlAGD4QJ2Oqtff3e99mxVnJr8AXSGi02ni0+YAAAAASUVORK5CYII=';

async function githubAPI(path: string) :Promise<IssueResponse> {
	const TOKEN = Deno.env.get('VAR_GITHUB_TOKEN')

	const headers = { 'Authorization' : `token ${TOKEN}`, 'Accept' : 'application/json' }
	const res = await fetch(`https://api.github.com/${path}`, {headers});
	if (res.status != 200) {
		throw new Error(`github access error: ${res.statusText}`);
	}
  	return await res.json();
}

// GraphQL APIクライアント
async function githubGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<GraphQLResponse<T>> {
	const TOKEN = Deno.env.get('VAR_GITHUB_TOKEN');
	
	const headers = {
		'Authorization': `token ${TOKEN}`,
		'Content-Type': 'application/json',
	};
	
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers,
		body: JSON.stringify({ query, variables }),
	});
	
	if (!res.ok) {
		throw new Error(`GraphQL API error: ${res.statusText}`);
	}
	
	return await res.json();
}

async function fetchIssues(params: {[index: string]: string}) {
	const url  = `search/issues?q=${Object.keys(params).map(k => `${k}:${params[k]}`).join('+')}`;
	const res = await githubAPI(url)
	return res;
}

async function enrichPRsWithStatus(issues: IssueResponse): Promise<void> {
	const prsByRepo = new Map<string, { owner: string; repo: string; numbers: number[] }>();
	
	for (const item of issues.items) {
		if (!item.html_url.includes('/pull/')) continue;
		
		const urlParts = item.repository_url.split('/');
		const repo = urlParts.pop() || '';
		const owner = urlParts.pop() || '';
		const repoKey = `${owner}/${repo}`;
		
		if (!prsByRepo.has(repoKey)) {
			prsByRepo.set(repoKey, { owner, repo, numbers: [] });
		}
		
		// PR番号を抽出
		const prNumber = parseInt(item.html_url.split('/pull/')[1]);
		prsByRepo.get(repoKey)!.numbers.push(prNumber);
	}
	
	// 各リポジトリのPRステータスを取得
	const statusPromises = Array.from(prsByRepo.entries()).map(async ([repoKey, { owner, repo, numbers }]) => {
		const query = `
			query GetPRStatuses($owner: String!, $repo: String!) {
				repository(owner: $owner, name: $repo) {
					${numbers.map((num, idx) => `
						pr${idx}: pullRequest(number: ${num}) {
							number
							commits(last: 1) {
								nodes {
									commit {
										statusCheckRollup {
											state
										}
									}
								}
							}
						}
					`).join('\n')}
				}
			}
		`;
		
		try {
			const result = await githubGraphQL<RepositoryPRStatus>(query, { owner, repo });
			
			if (result.data?.repository) {
				// ステータス情報をマップに格納
				const statusMap = new Map<string, string>();
				
				// 各PRのステータスを取得
				Object.keys(result.data.repository).forEach(key => {
					if (key.startsWith('pr')) {
						const pr = result.data!.repository[key];
						const state = pr.commits.nodes[0]?.commit?.statusCheckRollup?.state;
						if (state) {
							statusMap.set(`${repoKey}#${pr.number}`, state);
						}
					}
				});
				
				// 元のissuesにステータス情報を追加
				for (const item of issues.items) {
					if (!item.html_url.includes('/pull/')) continue;
					
					const itemRepo = item.repository_url.split('/').slice(-2).join('/');
					if (itemRepo === repoKey) {
						const prNumber = parseInt(item.html_url.split('/pull/')[1]);
						const state = statusMap.get(`${repoKey}#${prNumber}`);
						if (state) {
							item.statusCheckRollup = { state: state as 'SUCCESS' | 'FAILURE' | 'PENDING' | 'ERROR' };
						}
					}
				}
			}
		} catch (error) {
			// エラーが発生してもステータスなしで続行
			console.error(`Failed to fetch PR statuses for ${repoKey}:`, error);
		}
	});
	
	await Promise.all(statusPromises);
}

function printIssues(issues: IssueResponse, {title, color, icon, shouldFold = false} : {title: string, color: string, icon?: string, shouldFold?: boolean }) {
  const groupedByRepo = issues.items.reduce<{[repoKey: string]: IssueItem[]}>((acc, current) => {
    const partial = current.repository_url.split('/');
    const repo = partial.pop() || '';
    const org = partial.pop() || '';
    const repoKey = `${org} - ${repo}`;
    if (!acc[repoKey]) {
      acc[repoKey] = [];
    }
    acc[repoKey].push(current);
    return acc;
  }, {});

  xbar([
    {
      text: title,
      color: color,
    },
    ...Object.keys(groupedByRepo).flatMap((repoKey) => {
      const issuesInRepo = groupedByRepo[repoKey];
	  
      const groupedByMilestone = issuesInRepo.reduce<{[milestoneKey: string]: IssueItem[]}>((acc, current) => {
        const milestoneTitle = current.milestone ? current.milestone.title : "";
        if (!acc[milestoneTitle]) {
          acc[milestoneTitle] = [];
        }
        acc[milestoneTitle].push(current);
        return acc;
      }, {});

      return [
        { text: fold(repoKey, shouldFold) },
        ...Object.keys(groupedByMilestone).flatMap((milestoneKey) => [
          ...(milestoneKey ? [{ text: fold(`${milestoneKey}`, shouldFold) }]: [{ text: fold(`no-milestone`, shouldFold) }]),
          ...groupedByMilestone[milestoneKey].map(e => ({
            text: fold(`${e.title} by ${e.user.login}`, shouldFold),
            href: e.html_url,
            image: getIconForItem(e, icon),
          }))
        ])
      ];
    })
  ]);
}

function fold(text: string, fold = false) {
	return  `${(fold ? '--' : '')}${text}`
}

function getIconForItem(item: IssueItem, defaultIcon?: string): string {
	if (defaultIcon) {
		return defaultIcon;
	}
	const state = item.statusCheckRollup?.state;
	switch (state) {
		case 'SUCCESS':
			return ICON_MERGE;
		case 'FAILURE':
			return ICON_MERGE_CAUTION;
		case 'PENDING':
			return ICON_MERGE_CAUTION;
		case 'ERROR':
			return ICON_MERGE_CAUTION;
		default:
			return ICON_CAUTION;
	}
}


async function main() {
	const TOKEN = Deno.env.get('VAR_GITHUB_TOKEN')
	if (!TOKEN) {
		
		xbar([
			{
				text: '●',
				color: '#FF0000',
			},
			separator,
			{
				text: 'Open Plugin... in menu bar and set github token'
			}
		]);
		return;
	}
	const prs = await fetchIssues({'type': 'pr', 'author': '@me', 'state': 'open'});
	const reviews = await fetchIssues({'type': 'pr', 'state': 'open', 'review-requested': '@me'});
	const assigned = await fetchIssues({'type': 'issue', 'state': 'open', 'assignee': '@me'});
	
	// PRのステータス情報を取得
	await enrichPRsWithStatus(prs);
	await enrichPRsWithStatus(reviews);
	await enrichPRsWithStatus(assigned);
	
	xbar([
		{
			text: '●',
			color: (prs.total_count + reviews.total_count + assigned.total_count) == 0  ? '#7d7d7d' : '#4078C0',
		},
		separator,
		{
			text: `Last updated: ${new Date().toLocaleString()}`,
			color: '#aaaa99',
			refresh: true
		}
	]);
	printIssues(prs, {title: `Pull Requests (${prs.items.length})`, color: "#58BE89" } );
	xbar([
		{
			text: '---'
		}
	])
	printIssues(reviews, {title: `Awaiting Reviews (${reviews.items.length})`, color: '#ff0000' });
	xbar([
		{
			text: '---'
		}
	])
	printIssues(assigned, {title: `Assigned Issues (${assigned.items.length})`, color: '#66aaff', icon: ICON_CAUTION, shouldFold: assigned.items.length > 10 } );
}

try {
	await main();
} catch(e) {
	if (e instanceof Error) {
		console.log(e.message);
	}
}


interface IssueResponse {
	total_count: number,
	items: [IssueItem]
}

interface IssueItem {
	title: string,
	html_url: string,
	repository_url: string,
	user: {
		login: string
	},
	milestone?: {
		title: string,
	},
	// GraphQLで取得するステータス情報
	statusCheckRollup?: {
		state: 'SUCCESS' | 'FAILURE' | 'PENDING' | 'ERROR' | null
	}
}

// GraphQL関連の型定義
interface GraphQLResponse<T> {
	data?: T;
	errors?: Array<{
		message: string;
		path?: string[];
	}>;
}

interface RepositoryPRStatus {
	repository: {
		[key: string]: {
			number: number;
			commits: {
				nodes: Array<{
					commit: {
						statusCheckRollup: {
							state: 'SUCCESS' | 'FAILURE' | 'PENDING' | 'ERROR' | null;
						} | null;
					};
				}>;
			};
		};
	};
}
