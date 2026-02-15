import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import SectionOrnaments from './SectionOrnaments';

export default function InvitationDetails() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionOrnaments position="top" />

        {/* Welcome Message */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-rose-900 mb-6">
            Join Us in Celebration
          </h2>
          <p className="text-lg text-rose-800 leading-relaxed max-w-2xl mx-auto">
            We are delighted to invite you to share in our joy as we exchange vows and begin our
            journey together. Your presence would mean the world to us on this special day.
          </p>
        </div>

        {/* Date & Time */}
        <Card className="mb-8 border-rose-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-rose-700" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-rose-900 mb-2">Date & Time</h3>
                <p className="text-lg text-rose-800">Saturday, June 15th, 2026</p>
                <p className="text-rose-700 flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  4:00 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Venue */}
        <Card className="mb-8 border-rose-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-rose-700" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-rose-900 mb-2">Venue</h3>
                <p className="text-lg text-rose-800 font-medium">The Garden Estate</p>
                <p className="text-rose-700 mt-1">123 Blossom Lane</p>
                <p className="text-rose-700">Riverside, CA 92501</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="border-rose-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-rose-700 fill-rose-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-rose-900 mb-4">Schedule</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-rose-100 pb-3">
                    <span className="text-rose-800 font-medium">Ceremony</span>
                    <span className="text-rose-700">4:00 PM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-rose-100 pb-3">
                    <span className="text-rose-800 font-medium">Cocktail Hour</span>
                    <span className="text-rose-700">4:30 PM - 5:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-rose-100 pb-3">
                    <span className="text-rose-800 font-medium">Reception</span>
                    <span className="text-rose-700">5:30 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-rose-800 font-medium">Dancing & Celebration</span>
                    <span className="text-rose-700">7:00 PM onwards</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <SectionOrnaments position="bottom" />
      </div>
    </section>
  );
}
