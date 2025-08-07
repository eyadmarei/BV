import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, DollarSign, Target, Clock } from "lucide-react";
import type { Project, Release, Phase, Milestone } from "@shared/schema";

export default function PMToolsPage() {
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: releases = [], isLoading: releasesLoading } = useQuery<Release[]>({
    queryKey: ["/api/releases"],
  });

  const { data: phases = [], isLoading: phasesLoading } = useQuery<Phase[]>({
    queryKey: ["/api/phases"],
  });

  const { data: milestones = [], isLoading: milestonesLoading } = useQuery<Milestone[]>({
    queryKey: ["/api/milestones"],
  });

  if (projectsLoading || releasesLoading || phasesLoading || milestonesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading PM Tools...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentProject = projects[0]; // For now, use the first project
  const projectReleases = releases.filter(r => r.projectId === currentProject?.id);

  // Calculate project summary
  const totalMilestones = milestones.length;
  const paidMilestones = milestones.filter(m => m.isPaid).length;
  const totalBudget = currentProject?.totalBudget || 0;
  const kickoffPayments = milestones.filter(m => m.type === "kickoff").reduce((sum, m) => sum + m.amount, 0);
  const completionPayments = milestones.filter(m => m.type === "completion").reduce((sum, m) => sum + m.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
            📊 {currentProject?.title || "Project Management Tools"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {currentProject?.description || "Comprehensive project timeline and payment tracking"}
          </p>
        </div>

        {/* Project Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{projectReleases.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Releases</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{phases.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Phases</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <CalendarDays className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{paidMilestones}/{totalMilestones}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Paid Milestones</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${totalBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Budget</div>
            </CardContent>
          </Card>
        </div>

        {/* Gantt Chart Section */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-gray-900 dark:text-white">
              📊 Project Timeline - Gantt Chart
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                {/* Timeline Header */}
                <div className="grid grid-cols-7 gap-1 mb-2 border border-gray-300 dark:border-gray-600">
                  <div className="bg-gray-900 dark:bg-gray-700 text-white p-3 font-bold">Release</div>
                  <div className="bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 p-3 font-bold text-center">Week 0</div>
                  <div className="bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 p-3 font-bold text-center">Week 1</div>
                  <div className="bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 p-3 font-bold text-center">Week 2</div>
                  <div className="bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 p-3 font-bold text-center">Week 3</div>
                  <div className="bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 p-3 font-bold text-center">Week 4</div>
                  <div className="bg-white dark:bg-gray-800 p-3 font-bold text-center">Week 5</div>
                </div>

                {/* Timeline Rows */}
                {projectReleases.map((release) => {
                  const releasePhases = phases.filter(p => p.releaseId === release.id).sort((a, b) => a.week - b.week);
                  return (
                    <div key={release.id} className="grid grid-cols-7 gap-1 mb-2 border border-gray-300 dark:border-gray-600">
                      <div className="bg-gray-100 dark:bg-gray-700 p-4">
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{release.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">{release.theme}</div>
                      </div>
                      
                      {[0, 1, 2, 3, 4, 5].map((week) => {
                        const phase = releasePhases.find(p => p.week === week);
                        const isDemo = phase?.isDemo;
                        const isMvp = phase?.isMvp;
                        
                        return (
                          <div 
                            key={week}
                            className={`
                              border-r border-gray-300 dark:border-gray-600 last:border-r-0 p-2 h-16 flex items-center justify-center text-xs font-medium relative
                              ${isDemo ? 'bg-gray-200 dark:bg-gray-600 border-2 border-gray-900 dark:border-gray-300' : ''}
                              ${isMvp ? 'bg-gray-300 dark:bg-gray-500 border-2 border-gray-900 dark:border-gray-300' : ''}
                              ${!isDemo && !isMvp ? 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
                            `}
                          >
                            {phase?.name}
                            {isDemo && (
                              <div className="absolute -top-2 right-1 text-xs font-bold text-gray-900 dark:text-white">70%</div>
                            )}
                            {isMvp && (
                              <div className="absolute -top-2 right-1 text-xs font-bold text-gray-900 dark:text-white">MVP</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase Descriptions */}
        <Card className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-4">
              Development Phase Descriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Week 0 - Setup</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Project kickoff and initial planning. We review requirements, set up the development environment, and prepare the team for development work.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Week 1 - Preparation</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Detailed planning and design work. We create the technical blueprints and user interface designs needed to build your system.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Week 2 - Development</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Building your system. We code the features and functionality according to your requirements and our agreed specifications.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Week 3 - Demo & Review</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Initial demo showing approximately 70% of the features with working examples. We demonstrate each function type - for example, showing one brand's orders but not all brands, some filters but not all options. You review the progress and provide feedback on the direction and functionality.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Week 4 - Refinement</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We make improvements based on your feedback. Any requested changes, bug fixes, and final adjustments are completed during this week.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Week 5 - UAT & MVP</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Final testing by your team and launching the Minimum Viable Product (MVP). The MVP is a fully working version with core features that can go live and be used by real users. It may still be in beta or trial mode while we gather feedback and plan additional features for future releases.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Milestone Section */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-gray-900 dark:text-white">
              💰 Payment Milestone Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr>
                    <th className="bg-gray-900 dark:bg-gray-700 text-white p-4 text-left border border-gray-300 dark:border-gray-600">Milestone</th>
                    <th className="bg-gray-900 dark:bg-gray-700 text-white p-4 text-left border border-gray-300 dark:border-gray-600">Release Phase</th>
                    <th className="bg-gray-900 dark:bg-gray-700 text-white p-4 text-left border border-gray-300 dark:border-gray-600">Activity/Deliverable</th>
                    <th className="bg-gray-900 dark:bg-gray-700 text-white p-4 text-left border border-gray-300 dark:border-gray-600">Payment Amount</th>
                    <th className="bg-gray-900 dark:bg-gray-700 text-white p-4 text-left border border-gray-300 dark:border-gray-600">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map((milestone, index) => {
                    const release = releases.find(r => r.id === milestone.releaseId);
                    return (
                      <tr key={milestone.id} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}>
                        <td className="p-4 border border-gray-300 dark:border-gray-600">
                          <strong>{milestone.title}</strong>
                        </td>
                        <td className="p-4 border border-gray-300 dark:border-gray-600">
                          {release?.title}
                        </td>
                        <td className="p-4 border border-gray-300 dark:border-gray-600">
                          {milestone.description}
                        </td>
                        <td className="p-4 border border-gray-300 dark:border-gray-600">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${milestone.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-4 border border-gray-300 dark:border-gray-600">
                          <Badge 
                            variant={milestone.type === "kickoff" ? "default" : "secondary"}
                            className={milestone.type === "kickoff" 
                              ? "bg-gray-900 dark:bg-gray-700 text-white" 
                              : "bg-gray-600 dark:bg-gray-500 text-white"
                            }
                          >
                            {milestone.type.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-gray-900 dark:text-white">
              📋 Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 dark:bg-gray-700 text-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Kickoff Payments</h3>
                <div className="text-3xl font-bold mb-2">${kickoffPayments.toLocaleString()}</div>
                <div className="text-sm">4 × $1,500 payments</div>
              </div>
              
              <div className="bg-gray-600 dark:bg-gray-500 text-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Completion Payments</h3>
                <div className="text-3xl font-bold mb-2">${completionPayments.toLocaleString()}</div>
                <div className="text-sm">4 × $3,500 payments</div>
              </div>
              
              <div className="bg-gray-400 dark:bg-gray-300 text-white dark:text-gray-900 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Total Project Value</h3>
                <div className="text-3xl font-bold mb-2">${totalBudget.toLocaleString()}</div>
                <div className="text-sm">Complete development</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}