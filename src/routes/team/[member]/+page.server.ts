import teamData from '$content/team/team.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';
import type { TeamMember } from '../+page.server';

function getMemberSlug(member: TeamMember): string {
    return (member.urlSlug ?? member.name)?.replace(/\s/g, '');
}

export function load({ params }: PageServerLoadEvent) {
    // Find the member whose slug matches the URL param. Prefer urlSlug when set, else fall back to display name with spaces removed.
    const thisMember = teamData.team.find(member => getMemberSlug(member as TeamMember) === params.member.replace(/\s/g, ''));

    // Filter only valid members
    let validMember = thisMember && thisMember.name;

    const member: TeamMember = thisMember as TeamMember;

    if (validMember) {
        return {
            member
        };
    }

    if (!validMember) {
        throw error(404, `Member <strong>${params.member}</strong> not found.<br/><br/><a href="/team/" class="text-primary underline">Go back to the <strong>Team</strong> page?</a>`);
    }
}